import LoginSignupForm from "@/components/forms/LoginSingupForm";
import AuthTemplate from "./auth/AuthTemplate";
import SignUpCallLink from "./auth/SignUpCallLink";
import GoogleSignInButton from "./buttons/GoogleSignInButton";
import LogoutButton from "./buttons/LogoutButton";
import GoogleSignInError from "./errros/GoogleSignInError";

export const LoginSignUpPage = ({ heading }: { heading: string }) => {
  return (
    <AuthTemplate heading={heading} >
      <>
        <LoginSignupForm />
        <GoogleSignInButton />
        <GoogleSignInError />
        <LogoutButton />
        <SignUpCallLink />
      </>
    </AuthTemplate>
  )
}
