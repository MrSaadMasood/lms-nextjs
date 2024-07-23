import UserSidebar from "@/components/Dashboard/UserSidebar";
import { auth } from "@/lib/authJs/auth";
import { userExtractor } from "@/lib/utils/helpers";
import Image from "next/image";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <div className="h-screen w-screen  flex justify-center items-center">
      <aside className="h-full w-[20%]  hidden md:block">
        <section className="w-full h-[25%]  flex justify-center items-center">
          <div className="text-4xl lg:text-5xl font-bold">Qafia</div>
          <Image width={60} height={60} src={"/lms-logo.png"} alt="logo" />
        </section>
        {session && session.user.role === "user" ? (
          <UserSidebar />
        ) : (

          <UserSidebar />
        )}
      </aside>
      <section className="h-full w-full md:w-[80%] ">{children}</section>
    </div>
  );
}
