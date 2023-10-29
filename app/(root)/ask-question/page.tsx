import Question from "@/components/form/Question";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ReactElement } from "react";

const Page = (): ReactElement => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  // TODO: get user from DB

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question mongoUserId={userId} />
      </div>
    </div>
  );
};

export default Page;
