import React from "react";

const AuthLayout = ({ children }: Children) => {
  return (
    <section className="flex items-center justify-center mt-[100px] mb-[80px]">
      {children}
    </section>
  );
};

export default AuthLayout;
