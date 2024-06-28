import { LoginSignUpPage } from "@/components/LoginSignUpPage";
import { Suspense } from "react";

export default function Login() {
  return (
    <Suspense fallback={<div>loading the signup login page</div>}>
      <LoginSignUpPage heading="Log in to your account" />
    </Suspense>
  )
}
