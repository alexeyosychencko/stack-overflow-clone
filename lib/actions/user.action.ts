"use server";

import UserModel, { User } from "@/database/user.model";
import { connectToDb } from "../mongoose";

export async function getUserById(params: any): Promise<User | null> {
  try {
    connectToDb();

    const { userId } = params;

    return UserModel.findOne({ clerkId: userId });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
