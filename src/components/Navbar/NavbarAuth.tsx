"use client";
import { SessionProp } from "@/lib/types/exported-types";
import { navbarLinkGenerator } from "@/lib/utils/helpers";
import { authenticatedUserNavbarLinks } from "@/lib/variables/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { v4 as uuid } from "uuid";
import { userNavIcons } from "../componentConstants";

export default function NavbarAuth({ session }: SessionProp) {
  console.log("the session inside the user is", session?.user.role);
  const pathname = usePathname();
  return (
    <header className="">
      <section
        className="h-16 w-full absolute z-10 bottom-0 md:hidden 
      rounded-t-[2rem] flex justify-center items-center bg-white"
      >
        <ul className=" h-full w-full flex justify-around items-center">
          {session.user.role === "user" &&
            userNavIcons.map((obj, index) => {
              const Component = obj.item;
              const isActive = pathname.includes(authenticatedUserNavbarLinks[index]);
              return (
                <li key={uuid()}>
                  <Link
                    href={navbarLinkGenerator(
                      session.user.role,
                      authenticatedUserNavbarLinks[index],
                    )}
                  >
                    <Component size={20} color={isActive ? "black" : "gray"} />
                  </Link>
                </li>
              );
            })}
        </ul>
      </section>
    </header>
  );
}
