import { authLinksNavBar, navbarLink } from "@/lib/variables/constants";
import Image from "next/image";
import NavbarLink from "./NavBarLink";
import Link from "next/link";
import { randomUUID } from "crypto";
import clsx from "clsx";

export async function NavBarLargerScreenUnAuth() {
  return (
    <div className="w-full hidden px-8 justify-between items-center md:flex">
      <div className="justify-start  items-center gap-2 flex">
        <Image alt="logo" priority={true} src={`/lms-logo.png`} width={50} height={50} />
        <div className="justify-start items-center gap-3 flex">
          {navbarLink.map((link) => (
            <NavbarLink key={randomUUID()} content={link.content} to={link.to} />
          ))}
          <div />
        </div>
      </div>
      <div className="justify-start items-center gap-2 flex">
        {authLinksNavBar.map((link) => (
          <Link
            key={randomUUID()}
            href={link.to}
            className={clsx(
              `px-4 py-3 rounded-lg font-semibold flex justify-center items-center 
                leading-normal text-base `,
              link.content !== "Log In"
                ? `bg-violet-500 shadow border border-violet-500 text-white hover:bg-violet-700 duration-300`
                : `text-slate-600 hover:bg-gray-200 duration-200 `,
            )}
          >
            {link.content}
          </Link>
        ))}
      </div>
    </div>
  );
}
