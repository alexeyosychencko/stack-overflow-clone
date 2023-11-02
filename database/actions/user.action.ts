"use server";

import UserModel, { User } from "@/database/models/user.model";
import { connectToDb } from "../mongoose";
import { revalidatePath } from "next/cache";
import QuestionModel from "@/database/models/question.model";

export async function getUserById(clerkId: string): Promise<User | null> {
  try {
    connectToDb();

    return UserModel.findOne({ clerkId });
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
    connectToDb();

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
}): Promise<void> {
  try {
    connectToDb();

    const { clerkId, updateData, path } = data;

    await UserModel.findOneAndUpdate({ clerkId }, updateData, {
      new: true
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
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

    return deletedUser;
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    throw error;
  }
}
