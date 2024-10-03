import LoginSignupForm from "@/components/forms/LoginSingupForm";
import AuthTemplate from "./auth/AuthTemplate";
import SignUpCallLink from "./auth/SignUpCallLink";
import GoogleSignInButton from "./buttons/GoogleSignInButton";
import { login } from "@/actions/action";

export const LoginSignUpPage = ({
  heading,
  isAdminPage,
}: {
  heading: string;
  isAdminPage: boolean;
}) => {
  return (
    <AuthTemplate heading={heading}>
      <>
        <LoginSignupForm isAdminPage={isAdminPage} />
        <SignUpCallLink isAdminPage={isAdminPage} />
      </>
    </AuthTemplate>
  );
};
