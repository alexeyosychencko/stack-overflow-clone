import LocalSearch from "@/components/search/LocalSearch";
import Link from "next/link";
import { ReactElement } from "react";

const Home = (): ReactElement => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link
          href="/ask-question"
          className="primary-gradient min-h-[46px] rounded-md px-4 py-3 !text-light-900"
        >
          Ask a Question
        </Link>
      </div>

      <div className="mt-11 flex flex-col justify-between gap-5">
        <LocalSearch />
        <div>Filter</div>
      </div>
    </>
  );
};

export default Home;
