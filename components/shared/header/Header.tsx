import Link from "next/link";
import { ReactElement } from "react";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";

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
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev <span className="text-primary-500">Overflow</span>
        </p>
      </Link>
      <div>GlobalSerach</div>

      <div className="flex-between gap-5">
        Theme
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
