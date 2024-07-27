"use client";
import { navbarLinkGenerator } from "@/lib/utils/helpers";
import { authenticatedUserNavbarLinks } from "@/lib/variables/constants";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import { userNavIcons } from "../componentConstants";
import DashboardLayoutTemplate from "./DashboardLayoutTemplate";
import { v4 as uuid } from "uuid";
import Link from "next/link";

function UserSidebar() {
  const pathname = usePathname();
  return (
    <DashboardLayoutTemplate>
      {userNavIcons.map((obj, index) => {
        const Icon = obj.item;
        const isActive = pathname.includes(authenticatedUserNavbarLinks[index]);
        return (
          <Link
            key={uuid()}
            href={navbarLinkGenerator("user", authenticatedUserNavbarLinks[index])}
            className={clsx(
              ` w-[95%] lg:w-[80%] p-4 rounded-xl
             duration-300`,
              !isActive && "hover:bg-gray-200",
              isActive && `bg-black  text-white`,
            )}
          >
            <li className="w-full h-full flex justify-center items-center space-x-4">
              <div className=" w-[20%] ">
                <Icon size={20} />
              </div>
              <div className="text-base text-start flex justify-start items-center w-[80%] ">
                {obj.content}
              </div>
            </li>
          </Link>
        );
      })}
    </DashboardLayoutTemplate>
  );
}

export default UserSidebar;
