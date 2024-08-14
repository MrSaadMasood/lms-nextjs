"use client";
import { SessionProp } from "@/lib/types/exported-types";
import { navbarLinkGenerator } from "@/lib/utils/helpers";
import { authenticatedAdminNavBarLinks, authenticatedUserNavbarLinks } from "@/lib/variables/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { v4 as uuid } from "uuid";
import { adminNavIcons, userNavIcons } from "../componentConstants";

export default function NavbarAuth({ session }: SessionProp) {
  const pathname = usePathname();

  return (
    <header className="">
      <section
        className="h-16 w-full absolute z-10 bottom-0 md:hidden 
      rounded-t-[2rem] flex justify-center items-center bg-white"
      >
        <ul className=" h-full w-full flex justify-around items-center ">
          {session.user.role === "USER" &&
            userNavIcons.map((obj, index) => {
              const isActive = pathname.includes(authenticatedUserNavbarLinks[index]);
              return (
                <li key={uuid()}>
                  <Link
                    href={navbarLinkGenerator(
                      session.user.role,
                      authenticatedUserNavbarLinks[index],
                    )}
                  >
                    <obj.item size={20} color={isActive ? "black" : "gray"} />
                  </Link>
                </li>
              );
            })}
          {session.user.role === "ADMIN" && adminNavIcons.map((obj, index) => {
            const isActive = pathname.includes(authenticatedAdminNavBarLinks[index])
            return (
              <li key={uuid()}>
                <Link
                  href={navbarLinkGenerator(
                    session.user.role,
                    authenticatedAdminNavBarLinks[index],
                  )}
                >
                  <obj.item size={20} color={isActive ? "black" : "gray"} />
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </header>
  );
}
