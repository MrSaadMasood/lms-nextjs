import Image from 'next/image'
import React from 'react'

export default function AuthTemplate({ heading, children }: {
  heading: string,
  children: React.ReactNode
}) {
  return (
    <section className="w-screen h-screen pt-7 bg-gray-700 flex flex-col justify-start items-center">
      <div className="h-[85%] w-[45%] flex bg-blue-400 flex-col gap-2 justify-center
        items-center  ">
        <Image alt="logo" src={"/lms-logo.png"} width={100} height={100} />
        <h2 className="text-center text-gray-900 text-3xl font-semibold leading-normal">
          {heading}
        </h2>
        {!heading.toLowerCase().includes("forgot") && (
          <p className="text-center text-slate-600 text-base font-normal leading-normal">
            Welcome back! Please enter your details.
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
