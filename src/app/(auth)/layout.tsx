import NavbarUnAuth from "@/components/Navbar/NavbarUnAuth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarUnAuth />
      {children}
    </>
  );
}
