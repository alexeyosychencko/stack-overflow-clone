import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => (
  <main className="flex min-h-screen w-full items-center justify-center">
    {children}
  </main>
);

export default Layout;
