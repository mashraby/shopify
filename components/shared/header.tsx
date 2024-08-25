"use client";

import { useContext } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { CartContext } from "@/contexts/cart-context";
import { cn } from "@/lib/utils";

export default function Header() {
  const { products } = useContext(CartContext) as any;
  const count = products?.reduce(
    (sum: number, item: IProduct) => sum + item.quantity,
    0
  );
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="fixed top-0 left-0 bg-white z-50 flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
          <ShoppingBag className="h-8 w-8" />
          <span className="sr-only">Car E-commerce</span>
        </Link>
        <div className="ml-auto flex gap-2">
          <Link
            href={"/basket"}
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "relative"
            )}
          >
            <ShoppingCart className="h-6 w-6" />
            <span className="flex items-center justify-center absolute top-[0] p-1 right-[0] w-5 h-5 rounded-full bg-red-500 text-white ">
              {count < 10 ? count : "9+" || null}
            </span>
          </Link>

          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
    </div>
  );
}
