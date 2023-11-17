"use server";

import { UserModel, User } from "@/database/models/user.model";
import connectToDb from "../mongoose";
import { revalidatePath } from "next/cache";
import { Question, QuestionModel } from "@/database/models/question.model";
import { FilterQuery } from "mongoose";
import { UserFiltersValues } from "@/components/shared/filter/consts";
import { Tag, TagModel } from "../models/tag.model";
import { Answer, AnswerModel } from "../models/answer.model";

export async function getUserById(clerkId: string): Promise<User | null> {
  try {
    await connectToDb();

    return UserModel.findOne({ clerkId });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsers({
  searchQuery,
  filter
}: {
  searchQuery?: string;
  filter?: string;
}): Promise<{
  users: User[];
}> {
  try {
    await connectToDb();

    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } }
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case UserFiltersValues.NewUsers:
        sortOptions = { joinedAt: -1 };
        break;
      case UserFiltersValues.OldUsers:
        sortOptions = { joinedAt: 1 };
        break;
      case UserFiltersValues.TopContributors:
        sortOptions = { reputation: -1 };
        break;

      default:
        break;
    }

    const users = await UserModel.find(query).sort(sortOptions);

    return { users };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(data: {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}): Promise<User> {
  try {
    await connectToDb();

    const newUser = await UserModel.create(data);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(data: {
  clerkId: string;
  updateData: Partial<User>;
  path: string;
}): Promise<
  | {
      error: unknown;
    }
  | User
> {
  try {
    await connectToDb();

    const { clerkId, updateData, path } = data;

    const user = await UserModel.findOneAndUpdate({ clerkId }, updateData, {
      new: true
    });

    revalidatePath(path);

    return user;
  } catch (error) {
    console.log(error);
    return {
      error
    };
  }
}

export async function deleteUser(clerkId: string): Promise<User> {
  const conn = await connectToDb();
  const session = await conn.startSession();

  try {
    session.startTransaction();
    const user = await UserModel.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // Delete user from database
    // and questions, answers, comments, etc.

    // get user question ids
    // const userQuestionIds = await Question.find({ author: user._id}).distinct('_id');

    // delete user questions
    await QuestionModel.deleteMany({ author: user._id });

    // TODO: delete user answers, comments, etc.

    const deletedUser = await UserModel.findByIdAndDelete(user._id);

    await session.commitTransaction();

    return deletedUser!;
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    throw error;
  }
}

export async function toggleSaveQuestion(
  userId: string,
  questionId: string,
  path: string
) {
  await connectToDb();
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const isQuestionSaved = user.saved.includes(questionId);

    await UserModel.findByIdAndUpdate(
      userId,
      isQuestionSaved
        ? { $pull: { saved: questionId } }
        : { $addToSet: { saved: questionId } },
      { new: true }
    );

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuestions(
  clerkId: string,
  searchQuery?: string
): Promise<(Question & { tags: Tag[]; author: User })[]> {
  await connectToDb();
  const query: FilterQuery<typeof Question> = searchQuery
    ? { title: { $regex: new RegExp(searchQuery, "i") } }
    : {};

  const user = await UserModel.findOne<
    User & { saved: (Question & { tags: Tag[]; author: User })[] }
  >({ clerkId }).populate({
    path: "saved",
    match: query,
    populate: [
      { path: "tags", model: TagModel },
      { path: "author", model: UserModel }
    ]
  });

  if (!user) {
    throw new Error("User not found");
  }
  return user.saved;
}

export async function getUserInfo(clerkId: string): Promise<{
  user: User;
  questions: (Question & { tags: Tag[]; author: User })[];
  answers: (Answer & { author: User })[];
  tags: Tag[];
}> {
  await connectToDb();
  try {
    const user = await UserModel.findOne({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }

    const tags = await TagModel.find({ followers: user._id });
    const questions = (await QuestionModel.find({
      author: user._id
    })
      .populate({
        path: "tags",
        model: TagModel
      })
      .populate({ path: "author", model: UserModel })) as (Question & {
      tags: Tag[];
      author: User;
    })[];
    const answers = (await AnswerModel.find({ author: user._id }).populate({
      path: "author",
      model: UserModel
    })) as (Answer & { author: User })[];

    return {
      user,
      questions,
      answers,
      tags
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
