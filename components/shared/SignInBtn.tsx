import Image from "next/image";
import Link from "next/link";
import React from "react";

export const SignInBtn = (): React.ReactElement => {
  return (
    <Link
      href="/sign-up"
      className="small-medium light-border-2 btn-tertiary text-dark400_light900 flex min-h-[41px] w-full justify-center rounded-lg border px-4 py-3 shadow-none"
    >
      <Image
        src="/assets/icons/sign-up.svg"
        alt="login"
        width={20}
        height={20}
        className="invert-colors lg:hidden"
      />
      <span className="max-lg:hidden">Sign Up</span>
    </Link>
  );
};
