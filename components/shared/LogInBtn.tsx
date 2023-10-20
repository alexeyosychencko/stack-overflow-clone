import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export const LogInBtn = (): React.ReactElement => {
  return (
    <Link href="/sign-in">
      <Button className="btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3">
        <Image
          src="/assets/icons/account.svg"
          alt="sign up"
          width={20}
          height={20}
          className="invert-colors lg:hidden"
        />
        <span className="primary-text-gradient max-lg:hidden">Log In</span>
      </Button>
    </Link>
  );
};
