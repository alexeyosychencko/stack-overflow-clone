import QuestionCard from "@/components/card/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { getSavedQuestions } from "@/database/actions/user.action";
import { auth } from "@clerk/nextjs";
import { ReactElement } from "react";

export default async function Home({
  searchParams
}: {
  searchParams: { [key: string]: string | undefined };
}): Promise<ReactElement | null> {
  const { userId } = auth();

  if (!userId) return null;

  const questions = await getSavedQuestions(userId, searchParams.search);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 mb-11">Saved Questions</h1>

      <LocalSearch route="/collection" placeholder="Search for questions" />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question: any) => (
            <QuestionCard
              key={question.id}
              id={question.id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotesLength={question.upvotes.length}
              viewsLength={question.views}
              answersLength={question.answers.length}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult title="There’s no question saved to show" description="" />
        )}
      </div>
    </>
  );
}
