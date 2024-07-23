"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendEmail } from "@/actions/action";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useToaster from "@/hooks/useToaster";

const emailSchema = z.object({
  email: z.string().email({ message: "Must provide a Valid Email Adress" }),
});
function ForgotPasswordForm({ isAdminPage }: { isAdminPage: boolean }) {
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;
  const { errorToast, normalToast } = useToaster();

  async function sendEmailToUser(data: { email: string }) {
    const { error } = await sendEmail(data.email, isAdminPage ? "admin" : "user");
    if (error) return errorToast("Failed to send email");
    normalToast("Email sent successfully");
  }
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(sendEmailToUser)} className=" space-y-3">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending" : "Send Email"}
        </Button>
      </form>
    </Form>
  );
}

export default ForgotPasswordForm;
