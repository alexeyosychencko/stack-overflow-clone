import QuestionCard from "@/components/card/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { getQuestionsByTagId } from "@/database/actions/tag.action";
import { ReactElement } from "react";

const Page = async ({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}): Promise<ReactElement> => {
  const result = await getQuestionsByTagId(params.id, searchParams.search);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>

      <div className="mt-11 w-full">
        <LocalSearch
          route={`/tags/${params.id}`}
          placeholder="Search questions"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              id={question._id}
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
          <NoResult
            title="There’s no tag question saved to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
          />
        )}
      </div>
    </>
  );
};

export default Page;
