// "use client";

// import React, { createContext, useState, useContext } from "react";

// type ThemeMode = "light" | "dark";

// interface ThemeContextProps {
//   mode: string;
//   handleSetMode: (mode: ThemeMode) => void;
// }

// const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
//   const [mode, setMode] = useState<ThemeMode>("light");

//   const handleSetMode = (mode: ThemeMode) => {
//     setMode(mode);
//     document.documentElement.classList.add(mode);
//   };

//   return (
//     <ThemeContext.Provider value={{ mode, handleSetMode }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error("useTheme must be used within a ThemeProvider");
//   }
//   return context;
// };

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
