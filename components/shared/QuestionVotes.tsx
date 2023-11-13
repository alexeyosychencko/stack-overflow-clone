"use client";

import { ReactElement } from "react";
import Votes from "./Votes";
import {
  downvoteQuestion,
  upvoteQuestion
} from "@/database/actions/question.action";
import { usePathname } from "next/navigation";
import { toggleSaveQuestion } from "@/database/actions/user.action";

const QuestionVotes = ({
  userId,
  questionId,
  upvotes,
  downvotes,
  userQuestions
}: {
  userId: string;
  questionId: string;
  upvotes: string[];
  downvotes: string[];
  userQuestions?: string[];
}): ReactElement => {
  const pathname = usePathname();

  return (
    <Votes
      userId={userId}
      upvotes={upvotes}
      downvotes={downvotes}
      hasSaved={userQuestions?.includes(questionId)}
      upvoteHandler={async () => {
        await upvoteQuestion(
          questionId,
          userId,
          upvotes.includes(userId),
          downvotes.includes(userId),
          pathname
        );
      }}
      downvoteHandler={async () => {
        await downvoteQuestion(
          questionId,
          userId,
          upvotes.includes(userId),
          downvotes.includes(userId),
          pathname
        );
      }}
      saveHandler={async () => {
        await toggleSaveQuestion(userId, questionId, pathname);
      }}
    />
  );
};

export default QuestionVotes;
