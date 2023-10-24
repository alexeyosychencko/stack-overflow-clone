import Navbar from "@/components/navbar/Navbar";
import Header from "@/components/header/Header";
import React, { ReactElement } from "react";
import RightSidebar from "@/components/right-sidebar/RightSidebar";

const RootLayout = ({
  children
}: {
  children: React.ReactNode;
}): ReactElement => {
  return (
    <main className="background-light850_dark100 relative">
      <Header />
      <div className="flex">
        <Navbar />
        <section className="flex min-h-screen flex-1 flex-col px-4 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
      </div>

      <div>Toaster</div>
    </main>
  );
};

export default RootLayout;
