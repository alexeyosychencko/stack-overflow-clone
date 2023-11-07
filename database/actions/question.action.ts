"use server";

import connectToDb from "../mongoose";
import { QuestionModel, Question } from "@/database/models/question.model";
import { TagModel, Tag } from "@/database/models/tag.model";
import { revalidatePath } from "next/cache";
import { InteractionModel } from "@/database/models/interaction.model";
import { UserModel, User } from "@/database/models/user.model";
import { Answer, AnswerModel } from "../models/answer.model";
import { FilterQuery } from "mongoose";
import { QuestionFiltersValues } from "@/components/shared/filter/consts";

export async function getQuestions({
  searchQuery,
  filter,
  page = 1,
  pageSize = 10
}: {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}): Promise<{
  questions: (Question & { tags: Tag[]; author: User; answers: Answer[] })[];
  isNext: boolean;
}> {
  try {
    await connectToDb();

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Question> = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } }
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case QuestionFiltersValues.Newest:
        sortOptions = { createdAt: -1 };
        break;
      case QuestionFiltersValues.MostViewed:
        sortOptions = { views: -1 };
        break;
      case QuestionFiltersValues.MostAnswered:
        query.answers = { $size: 0 };
        break;
      case QuestionFiltersValues.Oldest:
        sortOptions = { createdAt: 1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
        break;
    }

    const questions = await QuestionModel.find<
      Question & { tags: Tag[]; author: User; answers: Answer[] }
    >(query)
      .populate({ path: "tags", model: TagModel })
      .populate({ path: "author", model: UserModel })
      .populate({ path: "answers", model: AnswerModel })
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    const totalQuestions = await QuestionModel.countDocuments(query);

    const isNext = totalQuestions > skipAmount + questions.length;

    return { questions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
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
        {
          $setOnInsert: { name: tag },
          $push: { questions: question._id, followers: author }
        },
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
