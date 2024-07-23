import AuthTemplate from "@/components/auth/AuthTemplate";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";

export default function ForgotPassword({ searchParams }: { searchParams: { admin: string } }) {
  const isAdminPage = !!searchParams.admin;
  return (
    <AuthTemplate heading="Forgot Password!">
      <ForgotPasswordForm isAdminPage={isAdminPage} />
    </AuthTemplate>
  );
}
