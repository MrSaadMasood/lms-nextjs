import { LoginSignUpPage } from "@/components/LoginSignUpPage";

export default function Signup({ searchParams }: { searchParams: { admin: string } }) {
  const isAdminPage = !!searchParams.admin
  return (
    <LoginSignUpPage heading="Create a new Account" isAdminPage={isAdminPage} />
  )
}
