"use client";

import { usePathname } from "next/navigation";
import { ReactElement } from "react";
import { sidebarLinks } from "./consts";
import Link from "next/link";
import Image from "next/image";
import { SheetClose } from "@/components/ui/sheet";

const Navbar = (): ReactElement => {
  const pathname = usePathname();

  return (
    <nav className="flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((link) => {
        const isActive =
          (pathname.includes(link.route) && link.route.length > 1) ||
          pathname === link.route;
        return (
          <SheetClose key={link.route}>
            <Link
              href={link.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {link.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </nav>
  );
};

export default Navbar;
