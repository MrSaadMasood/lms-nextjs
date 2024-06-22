import { auth } from "@/lib/authJs/auth";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuid } from "uuid"
import LogoutButton from "./buttons/LogoutButton";

export default async function Navbar() {
  const session = await auth()
  const navbarLink = ["Home", "About Us", "Pricing"]
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 justify-center items-center flex">
      <div className="w-full px-8 justify-between items-center flex">
        <div className="justify-start  items-center gap-2 flex">
          <Image alt="logo" src={`/lms-logo.png`} width={50} height={50} />
          <div className="justify-start items-center gap-3 flex">
            {navbarLink.map(link => (
              <NavbarLink key={uuid()} content={link} />
            ))}
            <div />
          </div>
        </div>
        {!session && <div className="justify-start items-center gap-2 flex">
          <Link href={"/login"}
            className="px-4 py-3 rounded-lg justify-center items-center flex
            text-slate-600 hover:bg-gray-200 duration-200 text-base font-semibold  leading-normal">
            Log in
          </Link>
          <Link href={"/signup"}
            className="px-4 py-3 bg-violet-500 rounded-lg shadow border border-violet-500 
            justify-center items-center flex 
            text-white text-base font-semibold  leading-normal hover:bg-violet-700 duration-300">
            Sign up
          </Link>
        </div>
        }
      </div>
    </header>)
}

function NavbarLink({ content }: {
  content: string,
}) {
  return (
    <Link href={`/${content.replace(" ", "").toLowerCase()}`}
      className="justify-center  p-2 rounded-lg hover:text-black duration-200
        items-center text-slate-600 text-base font-semibold leading-normal flex">
      {content}
    </Link>
  )
}
