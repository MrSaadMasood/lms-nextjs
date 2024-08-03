"use client";
import { navbarLinkGenerator } from "@/lib/utils/helpers";
import { authenticatedAdminNavBarLinks, authenticatedUserNavbarLinks } from "@/lib/variables/constants";
import { usePathname } from "next/navigation";
import { adminNavIcons, userNavIcons } from "../componentConstants";
import DashboardLayoutTemplate from "./DashboardLayoutTemplate";
import { v4 as uuid } from "uuid";
import { SessionProp } from "@/lib/types/exported-types";
import DashboardSideBarLinks from "./DashboardSideBarLinks";

function DashBoardSideBar({
  session
}: SessionProp) {
  const pathname = usePathname();
  return (
    <DashboardLayoutTemplate>
      {session.user.role === "user" && userNavIcons.map((obj, index) => {
        const Icon = obj.item;
        const isActive = pathname.includes(authenticatedUserNavbarLinks[index]);
        return (
          <DashboardSideBarLinks
            key={uuid()}
            uuid={uuid()}
            href={navbarLinkGenerator("user", authenticatedUserNavbarLinks[index])}
            isActive={isActive}
            content={obj.content}
          >
            <Icon size={20} />
          </DashboardSideBarLinks>
        );
      })}

      {session.user.role === "admin" && adminNavIcons.map((obj, index) => {
        const isActive = pathname.includes(authenticatedAdminNavBarLinks[index]);
        return (
          <DashboardSideBarLinks
            key={uuid()}
            uuid={uuid()}
            href={navbarLinkGenerator("admin", authenticatedAdminNavBarLinks[index])}
            isActive={isActive}
            content={obj.content}
          >
            <obj.item size={20} />
          </DashboardSideBarLinks>
        )
      })}
    </DashboardLayoutTemplate >
  );
}

export default DashBoardSideBar;
