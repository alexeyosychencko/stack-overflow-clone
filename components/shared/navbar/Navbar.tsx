import { ReactElement } from "react";
import NavbarMenu from "./NavbarMenu";

const Navbar = (): ReactElement => {
  return (
    <nav className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-5 pt-28 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[250px]">
      <NavbarMenu />
    </nav>
  );
};

export default Navbar;
