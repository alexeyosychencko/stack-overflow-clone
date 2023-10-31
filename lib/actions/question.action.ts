"use server";

import { connectToDb } from "../mongoose";
// import UserModel from "@/database/user.model";
import QuestionModel, { Question } from "@/database/question.model";
import TagModel, { Tag } from "@/database/tag.model";
import { revalidatePath } from "next/cache";
import InteractionModel from "@/database/interaction.model";
import UserModel, { User } from "@/database/user.model";

export async function getQuestions(
  page?: number,
  pageSize?: number,
  searchQuery?: string,
  filter?: string
): Promise<(Question & { tags: Tag[]; author: User })[]> {
  await connectToDb();

  const questions = await QuestionModel.find<
    Question & { tags: Tag[]; author: User }
  >({})
    .populate({ path: "tags", model: TagModel })
    .populate({ path: "author", model: UserModel });

  return questions as (Question & { tags: Tag[]; author: User })[];
}

export async function createQuestion(params: {
  title: string;
  explanation: string;
  tags: string[];
  author: string;
  path: string;
}): Promise<void> {
  const conn = await connectToDb();
  const session = await conn.startSession();

  const { title, explanation, tags, author, path } = params;
  try {
    session.startTransaction();
    // Create the question
    const question = await QuestionModel.create({
      title,
      explanation,
      author
    });

    const tagDocuments = [];

    // Create the tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await TagModel.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await QuestionModel.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } }
    });

    // Create an interaction record for the user's ask_question action
    await InteractionModel.create({
      user: author,
      action: "ask_question",
      question: question._id,
      tags: tagDocuments
    });

    // Increment author's reputation by +5 for creating a question
    await UserModel.findByIdAndUpdate(author, { $inc: { reputation: 5 } });

    await session.commitTransaction();

    revalidatePath(path);
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    throw error;
  }
}
