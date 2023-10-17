import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from "next/font/google";
import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter"
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk"
});

export const metadata: Metadata = {
  title: "CodeFlow",
  description:
    "A comunity-driven platform for asking and answering programming questions. Get help and share your knowledge with others.",
  icons: {
    icon: "assets/images/site-logo.svg"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          elements: {
            formButtonPrimary: "primary-gradient",
            footerActionLink: "primary-text-gradient hover:text-primary-500"
          }
        }}
      >
        <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
