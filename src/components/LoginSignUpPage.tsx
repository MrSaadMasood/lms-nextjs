import LoginSignupForm from "@/components/forms/LoginSingupForm";
import AuthTemplate from "./auth/AuthTemplate";
import SignUpCallLink from "./auth/SignUpCallLink";
import GoogleSignInButton from "./buttons/GoogleSignInButton";
import LogoutButton from "./buttons/LogoutButton";

export const LoginSignUpPage = ({ heading, isAdminPage }:
  {
    heading: string
    isAdminPage: boolean
  }) => {
  return (
    <AuthTemplate heading={heading} >
      <>
        <LoginSignupForm isAdminPage={isAdminPage} />
        {!isAdminPage && <GoogleSignInButton />}
        <LogoutButton />
        <SignUpCallLink isAdminPage={isAdminPage} />
      </>
    </AuthTemplate>
  )
}
