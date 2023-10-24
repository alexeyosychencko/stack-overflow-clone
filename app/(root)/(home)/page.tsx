import LocalSearch from "@/components/shared/search/LocalSearch";
import Filter from "@/components/shared/filter/Filter";
import { HomePageFilters } from "@/components/shared/filter/consts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactElement } from "react";
import { QuestionProps } from "@/components/card/types";
import QuestionCard from "@/components/card/QuestionCard";
import NoResult from "@/components/shared/NoResult";

const mockQuestions: QuestionProps[] = [
  {
    _id: "1",
    title: "How to use React Query?",
    author: "Joen See",
    tags: [
      { _id: "1", name: "react" },
      { _id: "2", name: "javascript" },
      { _id: "3", name: "typescript" }
    ],
    upvotes: 5,
    answers: 2,
    views: 100,
    createdAt: "2021-09-01T12:00:00.000Z"
  },
  {
    _id: "2",
    title: "How to use Typescript?",
    author: "Joen Lee",
    tags: [
      { _id: "1", name: "react" },
      { _id: "2", name: "javascript" },
      { _id: "3", name: "typescript" }
    ],
    upvotes: 15,
    answers: 22,
    views: 134,
    createdAt: "2021-09-01T12:00:00.000Z"
  }
];

const Home = (): ReactElement => {
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
        {mockQuestions.length ? (
          mockQuestions.map((question) => (
            <QuestionCard key={question._id} {...question} />
          ))
        ) : (
          <NoResult />
        )}
      </div>
    </>
  );
};

export default Home;
