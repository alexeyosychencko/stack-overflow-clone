import { ReactElement } from "react";
import SerachInput from "./SearchInput";

const GlobalSerach = (): ReactElement => {
  return (
    <div className="w-full max-w-[600px] max-md:hidden">
      <SerachInput placeholder="Search globaly" />
    </div>
  );
};

export default GlobalSerach;
