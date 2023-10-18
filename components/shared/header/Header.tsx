import Link from "next/link";
import { ReactElement } from "react";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";

const Header = (): ReactElement => {
  return (
    <header className="flex-between background-light900_dark200 fixed z-50 w-full p-6 shadow-light-300 dark:shadow-none sm:px-6">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          width={23}
          height={23}
          alt="CodeFlow"
        />
        <div className="h2-bold flex align-baseline font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          <div className="mr-1">Dev</div>{" "}
          <div className=" mt-px text-primary-500">Overflow</div>
        </div>
      </Link>
      <div>GlobalSerach</div>

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
      </div>
    </header>
  );
};

export default Header;
