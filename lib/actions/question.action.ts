"use server";

import { connectToDb } from "../mongoose";

export async function createQuestion() {
  try {
    await connectToDb();
  } catch (err) {}
}
