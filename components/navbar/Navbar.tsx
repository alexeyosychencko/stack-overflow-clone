import { ReactElement } from "react";
import NavbarMenu from "./NavbarMenu";
import { SignedOut } from "@clerk/nextjs";
import { LogInBtn } from "../shared/LogInBtn";
import { SignInBtn } from "../shared/SignInBtn";

const Navbar = (): ReactElement => {
  return (
    <nav className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-5 pt-28 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[250px]">
      <NavbarMenu />
      <SignedOut>
        <div className="flex flex-col gap-3 pt-10">
          <LogInBtn />
          <SignInBtn />
        </div>
      </SignedOut>
    </nav>
  );
};

export default Navbar;
