import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger
} from "@/components/ui/sheet";
import Image from "next/image";
import Logo from "../shared/Logo";
import { SignedOut } from "@clerk/nextjs";
import NavbarMenu from "./NavbarMenu";
import { LogInBtn } from "../shared/LogInBtn";
import { SignInBtn } from "../shared/SignInBtn";

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
          <NavbarMenu isMobile />
          <SignedOut>
            <div className="flex flex-col gap-3 pt-10">
              <SheetClose asChild>
                <LogInBtn />
              </SheetClose>
              <SheetClose asChild>
                <SignInBtn />
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
}
