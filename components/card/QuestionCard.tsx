import { ReactElement } from "react";
import { QuestionProps } from "./types";
import Link from "next/link";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";

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
          {createdAt}
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
        {author}

        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={upvotes}
            title=" Votes"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="message"
            value={answers}
            title=" Answers"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            value={views}
            title=" Views"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
