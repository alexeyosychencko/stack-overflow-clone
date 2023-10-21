import { ReactElement } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const GlobalSerach = (): ReactElement => {
  return (
    <div className="background-light800_darkgradient relative flex w-full max-w-[600px] rounded-md px-3 py-1 max-md:hidden">
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={20}
        height={20}
        className="mr-1 cursor-pointer"
      />
      <Input
        type="text"
        placeholder="Search globaly"
        className="paragraph-regular no-focus placeholder text-dark400_light500 border-none bg-transparent"
      />
    </div>
  );
};

export default GlobalSerach;
