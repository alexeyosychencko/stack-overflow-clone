"use client";

import { usePathname } from "next/navigation";
import { ReactElement } from "react";
import { sidebarLinks } from "./consts";
import Link from "next/link";
import Image from "next/image";
import { SheetClose } from "@/components/ui/sheet";

const NavbarMenu = ({ isMobile }: { isMobile?: boolean }): ReactElement => {
  const pathname = usePathname();

  return (
    <menu className="flex h-full flex-col gap-4">
      {sidebarLinks.map((link) => {
        const isActive =
          (pathname.includes(link.route) && link.route.length > 1) ||
          pathname === link.route;
        return isMobile ? (
          <SheetClose key={link.route}>
            <MenuLink {...link} isActive={isActive} />
          </SheetClose>
        ) : (
          <MenuLink {...link} isActive={isActive} />
        );
      })}
    </menu>
  );
};

function MenuLink({
  route,
  isActive,
  imgURL,
  label
}: {
  route: string;
  isActive: boolean;
  imgURL: string;
  label: string;
}): ReactElement {
  return (
    <Link
      key={route}
      href={route}
      className={`${
        isActive
          ? "primary-gradient rounded-lg text-light-900"
          : "text-dark300_light900"
      } flex items-center justify-start gap-4 bg-transparent p-2`}
    >
      <Image
        src={imgURL}
        alt={label}
        width={20}
        height={20}
        className={`${isActive ? "" : "invert-colors"}`}
      />
      <p className={`${isActive ? "base-bold" : "base-medium"}`}>{label}</p>
    </Link>
  );
}

export default NavbarMenu;
