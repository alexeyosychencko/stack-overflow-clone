"use server";

import { Schema } from "mongoose";
import { connectToDb } from "../mongoose";
import UserModel, { User } from "@/database/user.model";
import QuestionModel from "@/database/question.model";
import TagModel from "@/database/tag.model";
import { revalidatePath } from "next/cache";
import InteractionModel from "@/database/interaction.model";

export async function createQuestion(params: {
  title: string;
  explanation: string;
  tags: string[];
  author: Schema.Types.ObjectId | User;
  path: string;
}) {
  try {
    connectToDb();

    const { title, explanation, tags, author, path } = params;

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

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
