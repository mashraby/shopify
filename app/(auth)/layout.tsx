import React from "react";

const AuthLayout = ({ children }: Children) => {
  return (
    <section className="flex items-center justify-center pt-[40px] mb-[80px]">
      {children}
    </section>
  );
};

export default AuthLayout;
