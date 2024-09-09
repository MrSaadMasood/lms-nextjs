import Image from "next/image";
import React from "react";

export default function AuthTemplate({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="w-screen  h-screen pt-7  flex flex-col justify-start items-center">
      <div
        className="h-[85%] w-[90%] sm:w-[45%] flex  flex-col gap-2 justify-center
        items-center  "
      >
        <Image alt="logo" src={"/lms-logo.png"} width={100} height={100} />
        <h2 className="text-center  text-gray-900 sm:text-2xl text-3xl font-semibold leading-normal">
          {heading}
        </h2>
        {!heading.toLowerCase().includes("forgot") && (
          <p className="text-center text-slate-600 text-base font-normal leading-normal">
            Please enter your details.
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
