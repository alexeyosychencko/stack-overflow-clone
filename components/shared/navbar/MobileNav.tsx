import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger
} from "@/components/ui/sheet";
import Image from "next/image";
import Logo from "../Logo";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";
import Navbar from "./Navbar";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <SheetHeader>
          <Logo />
        </SheetHeader>
        <div className="pt-16">
          <Navbar isMobile />
          <SignedOut>
            <div className="flex flex-col gap-3 pt-10">
              <SheetClose asChild>
                <Link
                  href="/sign-in"
                  className="btn-secondary small-medium min-h-[41px] w-full rounded-lg px-4 py-3 text-center"
                >
                  <span className="primary-text-gradient">Log In</span>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/sign-up"
                  className="btn-tertiary  small-medium min-h-[41px] w-full rounded-lg px-4 py-3 text-center"
                >
                  Sign Up
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
}
