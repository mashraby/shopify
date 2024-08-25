"use client";

import React from "react";
import { CartContextProvider } from "@/contexts/cart-context";
import { ClerkProvider } from "@clerk/nextjs";

export const Providers = ({ children }: Children) => {
  return <CartContextProvider>{children}</CartContextProvider>;
};
