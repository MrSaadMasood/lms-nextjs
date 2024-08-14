import { NavBarLargerScreenUnAuth } from "./NavBarForLargerScreens";
import SideBar from "./SideBar";

export default function NavbarUnAuth() {
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200  justify-center items-center flex">
      <SideBar />
      <NavBarLargerScreenUnAuth />
    </header>
  );
}

