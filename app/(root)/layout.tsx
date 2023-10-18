import Header from "@/components/shared/header/Header";
import React, { ReactElement } from "react";

const RootLayout = ({
  children
}: {
  children: React.ReactNode;
}): ReactElement => {
  return (
    <main className="background-light850_dark100 relative">
      <Header />
      <div className="flex">
        <nav
          className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]"
          style={{ width: "200px" }}
        >
          Navbar
        </nav>

        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>

        <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
          RightSidebar
        </section>
      </div>

      <div>Toaster</div>
    </main>
  );
};

export default RootLayout;
