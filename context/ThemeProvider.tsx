"use client";

import React, { createContext, useState, useContext } from "react";

type ThemeMode = "light" | "dark";

interface ThemeContextProps {
  mode: string;
  handleSetMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>("light");

  const handleSetMode = (mode: ThemeMode) => {
    setMode(mode);
    document.documentElement.classList.add(mode);
  };

  return (
    <ThemeContext.Provider value={{ mode, handleSetMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
