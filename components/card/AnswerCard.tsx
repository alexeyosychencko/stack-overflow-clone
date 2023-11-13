"use client";

import { getTimestamp } from "@/lib/utils";
import Link from "next/link";
import { ReactElement } from "react";
import Image from "next/image";
import parse from "html-react-parser";
import Votes from "../shared/Votes";
import { downvoteAnswer, upvoteAnswer } from "@/database/actions/answer.action";
import { usePathname } from "next/navigation";

const AnswerCard = ({
  id,
  createdAt,
  content,
  clerkId,
  userId,
  authorPicture,
  authorName,
  upvotes,
  downvotes
}: {
  id: string;
  createdAt: Date;
  content: string;
  clerkId: string;
  userId?: string;
  authorPicture: string;
  authorName: string;
  upvotes: string[];
  downvotes: string[];
}): ReactElement => {
  const pathname = usePathname();

  return (
    <article className="card-wrapper light-border border-b p-5 ">
      <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <Link
          href={`/profile/${clerkId}`}
          className="flex flex-1 items-start gap-1 sm:items-center"
        >
          <Image
            src={authorPicture}
            width={18}
            height={18}
            alt="profile"
            className="rounded-full object-cover max-sm:mt-0.5"
          />
          <div className="flex flex-col sm:flex-row sm:items-center">
            <p className="body-semibold text-dark300_light700">{authorName}</p>

            <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
              answered {getTimestamp(createdAt)}
            </p>
          </div>
        </Link>
        <div className="flex justify-end">
          {userId ? (
            <Votes
              userId={userId}
              upvotes={upvotes}
              downvotes={downvotes}
              upvoteHandler={async () => {
                await upvoteAnswer(
                  id,
                  userId,
                  upvotes.includes(userId),
                  downvotes.includes(userId),
                  pathname
                );
              }}
              downvoteHandler={async () => {
                await downvoteAnswer(
                  id,
                  userId,
                  upvotes.includes(userId),
                  downvotes.includes(userId),
                  pathname
                );
              }}
            />
          ) : null}
        </div>
      </div>
      <div>{parse(content)}</div>
    </article>
  );
};

export default AnswerCard;
