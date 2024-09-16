"use client";

import React from "react";
import { CartContextProvider } from "@/contexts/cart-context";
import { ThemeProvider } from "@/components/shared/theme-provider";

export const Providers = ({ children }: Children) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CartContextProvider>{children}</CartContextProvider>
    </ThemeProvider>
  );
};
