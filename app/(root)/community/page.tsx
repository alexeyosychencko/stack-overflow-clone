import Filter from "@/components/shared/filter/Filter";
import { UserFilters } from "@/components/shared/filter/consts";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { ReactElement } from "react";

const Page = async (): Promise<ReactElement> => {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900 w-full text-left">
        All Questions
      </h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col">
        <LocalSearch route="/" placeholder="Search by username..." />
        <Filter filters={UserFilters} />
      </div>
    </>
  );
};

export default Page;
