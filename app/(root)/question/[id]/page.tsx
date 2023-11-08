import { getQuestionById } from "@/database/actions/question.action";
import { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import Metric from "@/components/shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import RenderTag from "@/components/shared/RenderTag";
import parse from "html-react-parser";

const Page = async ({
  params
}: {
  params: { [key: string]: string };
}): Promise<ReactElement> => {
  const question = await getQuestionById(params.id);

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${question.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={question.author.picture}
              className="rounded-full"
              width={22}
              height={22}
              alt="profile"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question.author.name}
            </p>
          </Link>
          <div className="flex justify-end">Votes</div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 w-full pt-3.5 text-left">
          {question.title}
        </h2>
      </div>

      <div className="mb-8 flex flex-wrap gap-4 pt-5">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimestamp(question.createdAt)}`}
          title=""
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(question.answers.length)}
          title=" Answers"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(question.views)}
          title=" Views"
        />
      </div>

      <div className="markdown w-full min-w-full">
        {parse(question.explanation)}
      </div>

      <div className="flex flex-wrap gap-2 pt-5">
        {question.tags.map((tag: any) => (
          <RenderTag
            key={tag.id}
            id={tag.id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>
    </>
  );
};

export default Page;