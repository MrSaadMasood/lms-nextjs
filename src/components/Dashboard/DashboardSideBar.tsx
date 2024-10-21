"use client";
import { navbarLinkGenerator } from "@/lib/utils/serverHelpers";
import { authenticatedAdminNavBarLinks, authenticatedUserNavbarLinks } from "@/lib/variables/constants";
import { usePathname } from "next/navigation";
import { adminNavIcons, userNavIcons } from "../componentConstants";
import DashboardLayoutTemplate from "./DashboardLayoutTemplate";
import { v4 as uuid } from "uuid";
import { SessionProp } from "@/lib/types/exported-types";
import DashboardSideBarLinks from "./DashboardSideBarLinks";
import { userNavigationLinkGenerator } from "@/lib/utils/clientHelpers";

function DashBoardSideBar({
  session
}: SessionProp) {
  const pathname = usePathname();
  return (
    <DashboardLayoutTemplate>
      {session.user.role === "USER" && userNavIcons.map((obj, index) => {
        const Icon = obj.item;
        const isActive = pathname.includes(authenticatedUserNavbarLinks[index]);
        const navigationLink = userNavigationLinkGenerator(authenticatedUserNavbarLinks[index])
        return (
          <DashboardSideBarLinks
            key={uuid()}
            uuid={uuid()}
            href={navbarLinkGenerator("USER", navigationLink)}
            isActive={isActive}
            content={obj.content}
          >
            <Icon size={20} />
          </DashboardSideBarLinks>
        );
      })}

      {session.user.role === "ADMIN" && adminNavIcons.map((obj, index) => {
        const isActive = pathname.includes(authenticatedAdminNavBarLinks[index]);
        return (
          <DashboardSideBarLinks
            key={uuid()}
            uuid={uuid()}
            href={navbarLinkGenerator("ADMIN", authenticatedAdminNavBarLinks[index])}
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
