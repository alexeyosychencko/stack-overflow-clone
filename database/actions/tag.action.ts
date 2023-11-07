"use server";

import { TagModel } from "../models/tag.model";
import connectToDb from "../mongoose";

export async function getTagsByUserId(userId: string) {
  try {
    connectToDb();

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
