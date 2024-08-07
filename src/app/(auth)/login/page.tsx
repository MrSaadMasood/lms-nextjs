import { LoginSignUpPage } from "@/components/LoginSignUpPage";
import { Suspense } from "react";

export default function Login({ searchParams }: { searchParams: { admin: string } }) {
  const isAdminPage = !!searchParams.admin;
  const accountType = isAdminPage ? "admin" : "user"
  return (
    <Suspense fallback={<div>loading the signup login page</div>}>
      <LoginSignUpPage heading={`Log in to ${accountType} account`} isAdminPage={isAdminPage} />
    </Suspense>
  );
}
