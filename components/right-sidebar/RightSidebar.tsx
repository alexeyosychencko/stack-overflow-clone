import { ReactElement } from "react";
import { mockHotQuestions, mockPopularTags } from "./consts";
import Link from "next/link";
import Image from "next/image";
import RenderTag from "../shared/RenderTag";

const RightSidebar = (): ReactElement => {
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[330px] flex-col overflow-y-auto border-l p-6 pt-28 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Hot Networks</h3>
        <ul className="mt-7 flex w-full flex-col gap-[30px]">
          {mockHotQuestions.map((question) => (
            <li key={question._id}>
              <Link
                href={`/question/${question._id}`}
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
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <ul className="mt-7 flex w-full flex-col gap-4">
          {mockPopularTags.map((tag) => (
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
