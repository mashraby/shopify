import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-4">Oops! Page Not Found</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        We're sorry, but the page you're looking for doesn't exist or has been
        moved.
      </p>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "default" }),
          "flex items-center"
        )}
      >
        <HomeIcon className="mr-2 h-4 w-4" />
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
