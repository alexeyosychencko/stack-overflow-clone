import Profile from "@/components/form/Profile";
import { getUserById } from "@/database/actions/user.action";
import { auth } from "@clerk/nextjs";

const Page = async () => {
  const { userId } = auth();
  if (!userId) return null;

  const user = await getUserById(userId);
  if (!user) return null;

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>

      <div className="mt-9">
        <Profile
          clerkId={userId.toString()}
          username={user.username}
          name={user.name}
          bio={user.bio}
          location={user.location}
          portfolioWebsite={user.portfolioWebsite}
        />
      </div>
    </>
  );
};

export default Page;
