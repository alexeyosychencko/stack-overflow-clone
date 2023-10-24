import { ReactElement } from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";
import Logo from "../shared/Logo";
import { MobileNav } from "../navbar/MobileNav";
import GlobalSerach from "../shared/search/GlobalSearch";

const Header = (): ReactElement => {
  return (
    <header className="flex-between background-light900_dark200 fixed z-50 w-full p-4 shadow-light-300 dark:shadow-none sm:px-6">
      <Logo />
      <GlobalSerach />
      <div className="flex-between gap-5">
        <ModeToggle />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10"
              },
              variables: {
                colorPrimary: "#ff7000"
              }
            }}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
