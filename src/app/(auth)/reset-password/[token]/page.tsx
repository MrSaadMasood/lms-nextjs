import AuthTemplate from "@/components/auth/AuthTemplate";
import ResetPasswordForm from '@/components/forms/ResetPasswordForm'
export default function ResetPassword() {
  return (
    <AuthTemplate heading="Forgot Password!" >
      <ResetPasswordForm />
    </AuthTemplate>
  )
}
