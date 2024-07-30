import Link from 'next/link'
import React from 'react'

export default function DashboardSideBarLinks() {
  return (
    <Link
      key={key}
      href={href}
      className={clsx(
        ` w-[95%] lg:w-[80%] p-4 rounded-xl
             duration-300`,
        !isActive && "hover:bg-gray-200",
        isActive && `bg-black  text-white`,
      )}
    >
      <li className="w-full h-full flex justify-center items-center space-x-4">
        <div className=" w-[20%] ">
          {children}
        </div>
        <div className="text-base text-start flex justify-start items-center w-[80%] ">
          {content}
        </div>
      </li>
    </Link>
  )
}

