import UserCard from "@/components/card/UserCard";
import Filter from "@/components/shared/filter/Filter";
import { UserFilters } from "@/components/shared/filter/consts";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { getAllUsers } from "@/database/actions/user.action";
import Link from "next/link";
import { ReactElement } from "react";

const Page = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | undefined };
}): Promise<ReactElement> => {
  const result = await getAllUsers({
    searchQuery: searchParams.search
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 w-full text-left">
        All Users
      </h1>

      <div className="flex justify-between gap-5 pt-11 max-sm:flex-col">
        <LocalSearch route="/community" placeholder="Search by username..." />
        <Filter filters={UserFilters} />
      </div>

      <section className="flex flex-wrap gap-4 pt-12">
        {result.users.length ? (
          result.users.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users yet</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default Page;
