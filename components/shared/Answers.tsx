import { getAnswers } from "@/database/actions/answer.action";
import { ReactElement } from "react";
import Filter from "./filter/Filter";
import { AnswerFilters } from "./filter/consts";
import { Answer } from "@/database/models/answer.model";

import { User } from "@/database/models/user.model";
import AnswerCard from "../card/AnswerCard";

export const Answers = async ({
  questionId,
  userId,
  totalAnswers,
  filter
}: {
  questionId: string;
  userId?: string;
  totalAnswers: number;
  filter?: string;
}): Promise<ReactElement> => {
  const answers = await getAnswers(questionId, filter);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>

      <div>
        {answers.map((answer: Answer & { author: User }) => (
          <AnswerCard
            key={answer.id}
            createdAt={answer.createdAt}
            content={answer.content}
            clerkId={answer.author.clerkId}
            authorPicture={answer.author.picture}
            authorName={answer.author.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Answers;
