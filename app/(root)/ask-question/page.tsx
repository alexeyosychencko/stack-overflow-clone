import Question from "@/components/form/Question";
import { getUserById } from "@/database/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ReactElement } from "react";

const Page = async (): Promise<ReactElement> => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const mongoUser = await getUserById(userId);

  if (!mongoUser) {
    return redirect("/sign-in");
  }

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question mongoUserId={mongoUser.id} />
      </div>
    </div>
  );
};

export default Page;
