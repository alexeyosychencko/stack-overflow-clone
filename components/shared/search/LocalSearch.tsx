import React from "react";
import SerachInput from "./SearchInput";

const LocalSearch = ({
  route,
  placeholder
}: {
  route: string;
  placeholder: string;
}): React.ReactElement => {
  return (
    <div className="w-full flex-1">
      <SerachInput placeholder={placeholder} />
    </div>
  );
};

export default LocalSearch;
