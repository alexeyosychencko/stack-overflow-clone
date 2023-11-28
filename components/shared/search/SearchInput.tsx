"use client";

import { ReactElement } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const SerachInput = ({
  value,
  placeholder,
  classes,
  setSearch
}: {
  value: string;
  placeholder: string;
  classes?: string;
  setSearch: (value: string) => void;
}): ReactElement => {
  return (
    <div
      className={`background-light800_darkgradient relative flex w-full rounded-md px-3 py-1 ${classes}`}
    >
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={20}
        height={20}
        className="mr-1 cursor-pointer"
      />
      <Input
        type="text"
        value={value}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className="paragraph-regular no-focus placeholder text-dark400_light500 border-none bg-transparent"
      />
    </div>
  );
};

export default SerachInput;
