import Link from "next/link";
import { ReactElement } from "react";
import Image from "next/image";

const Logo = (): ReactElement => {
  return (
    <Link href="/" className="flex items-center gap-1">
      <Image
        src="/assets/images/site-logo.svg"
        width={23}
        height={23}
        alt="CodeFlow"
      />
      <div className="h2-bold flex align-baseline font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
        <div className="mr-1">Code</div>{" "}
        <div className=" mt-px text-primary-500">Flow</div>
      </div>
    </Link>
  );
};

export default Logo;
