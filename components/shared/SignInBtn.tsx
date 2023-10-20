import Link from "next/link";
import React from "react";

export const SignInBtn = (): React.ReactElement => {
  return (
    <Link
      href="/sign-up"
      className="btn-tertiary  small-medium min-h-[41px] w-full rounded-lg px-4 py-3 text-center"
    >
      Sign Up
    </Link>
  );
};
