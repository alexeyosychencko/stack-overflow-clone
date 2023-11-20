"use server";

import { FilterQuery } from "mongoose";
import { Question, QuestionModel } from "../models/question.model";
import { Tag, TagModel } from "../models/tag.model";
import connectToDb from "../mongoose";
import { User, UserModel } from "../models/user.model";

export async function getTagsByUserId(userId: string) {
  try {
    await connectToDb();

    const tags = await TagModel.find(
      { followers: userId },
      {},
      {
        limit: 3
      }
    );
    return tags;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getQuestionsByTagId(
  tagId: string,
  searchQuery?: string
): Promise<{ tagTitle: string; questions: Question[] }> {
  try {
    await connectToDb();

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    const tag = await TagModel.findOne<
      Tag & { questions: (Question & { tags: Tag[]; author: User })[] }
    >({ _id: tagId }).populate({
      path: "questions",
      model: QuestionModel,
      match: query,
      options: {
        sort: { createdAt: -1 }
      },
      populate: [
        { path: "tags", model: TagModel },
        { path: "author", model: UserModel }
      ]
    });
    if (!tag) {
      throw new Error("Tag not found");
    }

    return {
      tagTitle: tag.name,
      questions: tag.questions
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getTopPopularTags() {
  try {
    await connectToDb();

    const popularTags = await TagModel.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 }
    ]);

    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
