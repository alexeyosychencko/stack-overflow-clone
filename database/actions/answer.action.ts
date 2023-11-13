"use server";

import connectToDb from "../mongoose";
import { QuestionModel } from "../models/question.model";
import { Answer, AnswerModel } from "../models/answer.model";
import { InteractionModel } from "../models/interaction.model";
import { User, UserModel } from "../models/user.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: {
  content: string;
  author: string;
  question: string;
  path: string;
}): Promise<
  | {
      error: unknown;
    }
  | undefined
> {
  const conn = await connectToDb();
  const session = await conn.startSession();

  const { content, author, question, path } = params;

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
    return {
      error
    };
  }
}

export async function getAnswers(
  questionId: string,
  sortBy?: string
): Promise<(Answer & { author: User })[]> {
  await connectToDb();
  try {
    let sortOptions = {};

    switch (sortBy) {
      case "highestUpvotes":
        sortOptions = { upvotes: -1 };
        break;
      case "lowestUpvotes":
        sortOptions = { upvotes: 1 };
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
        break;
    }

    const answers = AnswerModel.find<Answer & { author: User }>({
      question: questionId
    })
      .populate({ path: "author", model: UserModel })
      .sort(sortOptions);

    return answers;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function upvoteAnswer(
  answerId: string,
  userId: string,
  hasUpvoted: boolean,
  hasDownvoted: boolean,
  path: string
) {
  const conn = await connectToDb();
  const session = await conn.startSession();
  try {
    session.startTransaction();
    let updateQuery = {};

    if (hasUpvoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasDownvoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId }
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const answer = await AnswerModel.findByIdAndUpdate(answerId, updateQuery, {
      new: true
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    // Increment author's reputation
    await UserModel.findByIdAndUpdate(userId, {
      $inc: { reputation: hasDownvoted ? -2 : 2 }
    });

    await UserModel.findByIdAndUpdate(answer.author, {
      $inc: { reputation: hasDownvoted ? -10 : 10 }
    });
    await session.commitTransaction();
    revalidatePath(path);
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    throw error;
  }
}

export async function downvoteAnswer(
  answerId: string,
  userId: string,
  hasupVoted: boolean,
  hasdownVoted: boolean,
  path: string
) {
  const conn = await connectToDb();
  const session = await conn.startSession();
  try {
    session.startTransaction();

    let updateQuery = {};
    if (hasdownVoted) {
      updateQuery = { $pull: { downvote: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId }
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const answer = await AnswerModel.findByIdAndUpdate(answerId, updateQuery, {
      new: true
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    // Increment author's reputation
    await UserModel.findByIdAndUpdate(userId, {
      $inc: { reputation: hasdownVoted ? -2 : 2 }
    });

    await UserModel.findByIdAndUpdate(answer.author, {
      $inc: { reputation: hasdownVoted ? -10 : 10 }
    });
    await session.commitTransaction();
    revalidatePath(path);
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    throw error;
  }
}
