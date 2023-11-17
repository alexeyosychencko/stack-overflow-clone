"use server";

import connectToDb from "../mongoose";
import { QuestionModel, Question } from "@/database/models/question.model";
import { TagModel, Tag } from "@/database/models/tag.model";
import { revalidatePath } from "next/cache";
import { InteractionModel } from "@/database/models/interaction.model";
import { UserModel, User } from "@/database/models/user.model";
import { Answer } from "../models/answer.model";
import { FilterQuery } from "mongoose";
import { QuestionFiltersValues } from "@/components/shared/filter/consts";

export async function getQuestionById(
  id: string
): Promise<Question & { tags: Tag[]; author: User }> {
  try {
    await connectToDb();

    const question = await QuestionModel.findById(id)
      .populate({ path: "tags", model: TagModel })
      .populate({ path: "author", model: UserModel });

    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestions({
  searchQuery,
  filter
}: {
  searchQuery?: string;
  filter?: string;
}): Promise<{
  questions: (Question & { tags: Tag[]; author: User; answers: Answer[] })[];
}> {
  try {
    await connectToDb();

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
      .sort(sortOptions);

    return { questions };
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
}) {
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
    return {
      error
    };
  }
}

export async function upvoteQuestion(
  questionId: string,
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

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId }
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const question = await QuestionModel.findByIdAndUpdate(
      questionId,
      updateQuery,
      { new: true }
    );

    if (!question) {
      throw new Error("Question not found");
    }

    // Increment author's reputation by +1/-1 for upvoting/revoking an upvote to the question
    await UserModel.findByIdAndUpdate(userId, {
      $inc: { reputation: hasupVoted ? -1 : 1 }
    });

    // Increment author's reputation by +10/-10 for recieving an upvote/downvote to the question
    await UserModel.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasupVoted ? -10 : 10 }
    });

    await session.commitTransaction();
    revalidatePath(path);
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    throw error;
  }
}

export async function downvoteQuestion(
  questionId: string,
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

    const question = await QuestionModel.findByIdAndUpdate(
      questionId,
      updateQuery,
      { new: true }
    );

    if (!question) {
      throw new Error("Question not found");
    }

    // Increment author's reputation
    await UserModel.findByIdAndUpdate(userId, {
      $inc: { reputation: hasdownVoted ? -2 : 2 }
    });

    await UserModel.findByIdAndUpdate(question.author, {
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
