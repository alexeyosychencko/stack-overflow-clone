import LocalSearch from "@/components/shared/search/LocalSearch";
import Filter from "@/components/shared/filter/Filter";
import { HomePageFilters } from "@/components/shared/filter/consts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactElement } from "react";
import QuestionCard from "@/components/card/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import { auth } from "@clerk/nextjs";
import { getQuestions } from "@/lib/actions/question.action";
import { Tag } from "@/database/tag.model";
import { User } from "@/database/user.model";

const Home = async (): Promise<ReactElement> => {
  const { userId } = auth();

  const questions = await getQuestions();

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

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col">
        <LocalSearch route="/" placeholder="Search for questions" />
        <Filter filters={HomePageFilters} />
      </div>

      <div className="mt-11 flex w-full flex-col gap-6">
        {questions.length ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags as Tag[]}
              author={question.author as User}
              upvotes={question.upvotes as any}
              views={question.views as any}
              answers={question.answers as any}
              createdAt={question.createdAt as any}
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
