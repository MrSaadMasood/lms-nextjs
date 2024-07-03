import AuthTemplate from "@/components/auth/AuthTemplate";
import ResetPasswordForm from '@/components/forms/ResetPasswordForm'
export default function ResetPassword({ searchParams }: { searchParams: { admin: string } }) {
  const isAdminPage = !!searchParams.admin
  return (
    <AuthTemplate heading="Forgot Password!" >
      <ResetPasswordForm isAdminPage={isAdminPage} />
    </AuthTemplate>
  )
}
