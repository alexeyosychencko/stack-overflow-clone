import Link from "next/link";
import React from "react";

export const LogInBtn = (): React.ReactElement => {
  return (
    <Link
      href="/sign-in"
      className="btn-secondary small-medium min-h-[41px] w-full rounded-lg px-4 py-3 text-center"
    >
      <span className="primary-text-gradient">Log In</span>
    </Link>
  );
};
