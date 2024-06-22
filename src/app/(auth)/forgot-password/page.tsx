import AuthTemplate from "@/components/auth/AuthTemplate";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <AuthTemplate heading="Forgot Password!" >
      <ForgotPasswordForm />
    </AuthTemplate>
  )
}
