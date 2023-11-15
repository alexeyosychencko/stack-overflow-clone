import { getUserInfo } from "@/database/actions/user.action";
import { ReactElement } from "react";
import Image from "next/image";
import { SignedIn, auth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionCard from "@/components/card/QuestionCard";
import AnswerCard from "@/components/card/AnswerCard";
import RenderTag from "@/components/shared/RenderTag";

const Page = async ({
  params
}: {
  params: { [key: string]: string };
}): Promise<ReactElement> => {
  const { userId: clerkId } = auth();
  const { user, questions, answers, tags } = await getUserInfo(params.id);

  return (
    <>
      <div className="mb-5 flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex items-start gap-4">
          <Image
            src={user.picture}
            alt="profile picture"
            width={120}
            height={120}
            className="rounded-full object-cover"
          />
          <div className="mt-3">
            <h2 className="text-dark100_light900 font-bold">{user.name}</h2>
            <p className="paragraph-regular text-dark200_light800">
              @{user.username}
            </p>

            {user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {user.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === user.clerkId && (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      <div className="flex gap-2 align-middle">
        <div>Tags:</div>
        {tags.map((tag) => (
          <RenderTag key={tag.id} id={tag.id} name={tag.name} />
        ))}
      </div>

      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Questions
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="top-posts"
            className="mt-5 flex w-full flex-col gap-6"
          >
            {(questions.length &&
              questions.map((q) => (
                <QuestionCard
                  key={q.id}
                  clerkId={clerkId}
                  id={q.id}
                  title={q.title}
                  tags={q.tags}
                  author={q.author}
                  upvotesLength={q.upvotes.length}
                  viewsLength={q.views}
                  answersLength={q.answers.length}
                  createdAt={q.createdAt}
                />
              ))) ||
              null}
          </TabsContent>
          <TabsContent value="answers" className="flex w-full flex-col gap-6">
            {(answers.length &&
              answers.map((a) => (
                <AnswerCard
                  key={a.id}
                  id={a.id}
                  createdAt={a.createdAt}
                  content={a.content}
                  clerkId={user.clerkId}
                  authorPicture={a.author.picture}
                  authorName={a.author.name}
                  upvotes={a.upvotes}
                  downvotes={a.downvotes}
                />
              ))) ||
              null}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
