"use client";

import { ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import { formatAndDivideNumber } from "@/lib/utils";

const Votes = ({
  userId,
  upvotes,
  downvotes,
  withSaved,
  hasSaved,
  upvoteHandler,
  downvoteHandler,
  saveHandler
}: {
  userId: string;
  upvotes: string[];
  downvotes: string[];
  withSaved?: boolean;
  hasSaved?: boolean;
  upvoteHandler?: () => Promise<void>;
  downvoteHandler?: () => Promise<void>;
  saveHandler?: () => Promise<void>;
}): ReactElement => {
  const [isProcessing, setIsProcessing] = useState(false);

  const hasupVoted = upvotes.includes(userId);
  const hasdownVoted = downvotes.includes(userId);

  const handleAction = async (action: () => Promise<void>) => {
    setIsProcessing(true);
    await action();
    setIsProcessing(false);

    // TODO: show toast
  };

  useEffect(() => {
    console.log("open something");
  }, []);

  return (
    <div>
      {isProcessing ? (
        <div className="w-full text-center">
          <Image
            src="/assets/icons/spinner.svg"
            width={18}
            height={18}
            alt="loading"
          />
        </div>
      ) : (
        <div className="flex gap-5">
          <div className="flex-center gap-2.5">
            <div className="flex-center gap-1.5">
              <Image
                src={
                  hasupVoted
                    ? "/assets/icons/upvoted.svg"
                    : "/assets/icons/upvote.svg"
                }
                width={18}
                height={18}
                alt="upvote"
                className="cursor-pointer"
                // onClick={async () => {
                //   await handleAction(upvoteHandler);
                // }}
              />

              <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
                <p className="subtle-medium text-dark400_light900">
                  {formatAndDivideNumber(upvotes.length)}
                </p>
              </div>
            </div>

            <div className="flex-center gap-1.5">
              <Image
                src={
                  hasdownVoted
                    ? "/assets/icons/downvoted.svg"
                    : "/assets/icons/downvote.svg"
                }
                width={18}
                height={18}
                alt="downvote"
                className="cursor-pointer"
                // onClick={async () => {
                //   await handleAction(downvoteHandler);
                // }}
              />

              <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
                <p className="subtle-medium text-dark400_light900">
                  {formatAndDivideNumber(downvotes.length)}
                </p>
              </div>
            </div>
          </div>

          {withSaved ? (
            <Image
              src={
                hasSaved
                  ? "/assets/icons/star-filled.svg"
                  : "/assets/icons/star-red.svg"
              }
              width={18}
              height={18}
              alt="star"
              className="cursor-pointer"
              onClick={async () => {
                if (!saveHandler) return;
                await handleAction(saveHandler);
              }}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Votes;
