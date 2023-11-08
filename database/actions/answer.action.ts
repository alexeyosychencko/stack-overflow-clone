import connectToDb from "../mongoose";
import { QuestionModel } from "../models/question.model";
import { AnswerModel } from "../models/answer.model";
import { InteractionModel } from "../models/interaction.model";
import { UserModel } from "../models/user.model";
import { revalidatePath } from "next/cache";

export async function createAnswer({
  content,
  author,
  question,
  path
}: {
  content: string;
  author: string;
  question: string;
  path: string;
}): Promise<void> {
  const conn = await connectToDb();
  const session = await conn.startSession();
  try {
    session.startTransaction();
    const newAnswer = await AnswerModel.create({ content, author, question });

    // Add the answer to the question's answers array
    const questionObject = await QuestionModel.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id }
    });

    await InteractionModel.create({
      user: author,
      action: "answer",
      question,
      answer: newAnswer._id,
      tags: questionObject.tags
    });

    await UserModel.findByIdAndUpdate(author, { $inc: { reputation: 10 } });
    session.commitTransaction();
    revalidatePath(path);
  } catch (error) {
    session.abortTransaction();
    console.log(error);
    throw error;
  }
}
