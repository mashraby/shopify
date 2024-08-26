import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
        © 2024 Shopify. Created by{" "}
        <Link href={"https://t.me/MashrabYoldashov"} target="_blank">
          @MashrabYoldashov
        </Link>
        .
      </div>
    </footer>
  );
};

export default Footer;
