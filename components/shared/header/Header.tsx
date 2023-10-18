import { ReactElement } from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";
import Logo from "../Logo";
import { MobileNav } from "../navbar/MobileNav";

const Header = (): ReactElement => {
  return (
    <header className="flex-between background-light900_dark200 fixed z-50 w-full p-6 shadow-light-300 dark:shadow-none sm:px-6">
      <Logo />
      <div className="max-md:hidden">GlobalSerach</div>

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
