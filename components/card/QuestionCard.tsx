import { ReactElement } from "react";
import { QuestionProps } from "./types";
import Link from "next/link";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import Image from "next/image";

const QuestionCard = ({
  clerkId,
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt
}: QuestionProps): ReactElement => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div>
        <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
          {getTimestamp(createdAt)}
        </span>
        <Link href={`/question/${_id}`}>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {title}
          </h3>
        </Link>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Link href={`/profile/${author._id}`} className="flex-center  gap-1">
          <Image
            src={author.picture}
            width={16}
            height={16}
            alt="user avatar"
            className="rounded-full object-contain"
          />

          <p className="body-medium text-dark400_light700 flex items-center gap-1">
            {author.name}
            <span className="small-regular line-clamp-1 max-sm:hidden">
              {` - asked ${getTimestamp(createdAt)}`}
            </span>
          </p>
        </Link>

        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={formatAndDivideNumber(upvotes.length)}
            title=" Votes"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="message"
            value={formatAndDivideNumber(answers.length)}
            title=" Answers"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            value={formatAndDivideNumber(views)}
            title=" Views"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
