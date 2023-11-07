import LocalSearch from "@/components/shared/search/LocalSearch";
import Filter from "@/components/shared/filter/Filter";
import { QuestionFilters } from "@/components/shared/filter/consts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactElement } from "react";
import QuestionCard from "@/components/card/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import { auth } from "@clerk/nextjs";
import { getQuestions } from "@/database/actions/question.action";

const Home = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | undefined };
}): Promise<ReactElement> => {
  const { userId } = auth();

  const result = await getQuestions({
    searchQuery: searchParams.search,
    filter: searchParams.filter
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="flex justify-between gap-5 pt-11 max-sm:flex-col">
        <LocalSearch route="/" placeholder="Search for questions" />
        <Filter filters={QuestionFilters} />
      </div>

      <div className="flex w-full flex-col gap-6 pt-11">
        {result.questions.length ? (
          result.questions.map((question) => (
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
              clerkId={userId}
            />
          ))
        ) : (
          <NoResult
            title="There’s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
          />
        )}
      </div>
    </>
  );
};

export default Home;
