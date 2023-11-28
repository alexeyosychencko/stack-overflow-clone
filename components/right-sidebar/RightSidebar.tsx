import { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import RenderTag from "../shared/RenderTag";
import { getHotQuestions } from "@/database/actions/question.action";
import { getTopPopularTags } from "@/database/actions/tag.action";

const RightSidebar = async (): Promise<ReactElement> => {
  const hotQuestions = await getHotQuestions();
  const popularTags = await getTopPopularTags();

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[330px] flex-col overflow-y-auto border-l p-6 pt-28 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Hot networks</h3>
        <ul className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <li key={question.id}>
              <Link
                href={`/question/${question.id}`}
                className="flex cursor-pointer items-center justify-between gap-7"
              >
                <p className="body-medium text-dark500_light700">
                  {question.title}
                </p>
                <Image
                  src="/assets/icons/chevron-right.svg"
                  alt="chevron right"
                  width={20}
                  height={20}
                  className="invert-colors"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular tags</h3>
        <ul className="mt-7 flex w-full flex-col gap-4">
          {popularTags.map((tag) => (
            <li key={tag._id}>
              <RenderTag
                id={tag._id}
                name={tag.name}
                totalQuestions={tag.numberOfQuestions}
                showCount
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RightSidebar;
