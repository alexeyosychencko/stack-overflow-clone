"use client";

import React, { useEffect, useState } from "react";
import SerachInput from "./SearchInput";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

const LocalSearch = ({
  route,
  placeholder
}: {
  route: string;
  placeholder: string;
}): React.ReactElement => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("search");

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "search",
          value: search
        });

        router.push(newUrl, { scroll: false });
        return;
      }
      if (pathname === route) {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["search"]
        });

        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, route, pathname, router, searchParams, query]);

  return (
    <div className="w-full flex-1">
      <SerachInput
        placeholder={placeholder}
        setSearch={setSearch}
        value={search}
      />
    </div>
  );
};

export default LocalSearch;
