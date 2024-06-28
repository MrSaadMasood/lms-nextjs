'use client'
import { updateUserPassword } from "@/actions/action";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useToaster from "@/hooks/useToaster";
import { passwordSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "../ui/checkbox";

const emailSchema = z.object({
  newPassword: passwordSchema,
  confirmPassword: passwordSchema
})
function ResetPasswordForm() {

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
  })
  const [showPassword, setShowPassword] = useState(false)
  const { handleSubmit, control, formState: { isSubmitting } } = form
  const { errorToast, normalToast } = useToaster()
  const pathname = usePathname()
  const router = useRouter()

  async function updatePassword(data: { [key: string]: string }) {
    if (data.newPassword !== data.confirmPassword) {
      return errorToast("Passwords do not match! Try Again!")
    }
    const token = pathname.split("/").pop()
    const result = await updateUserPassword(token || "", data.newPassword)
    if (!result) return errorToast("Password Update Failed")
    router.replace("/login")
  }
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(updatePassword)} className=" space-y-3">
        <FormField control={control} name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type={showPassword ? "text" : "password"} placeholder="New Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>)} />
        <FormField control={control} name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type={showPassword ? "text" : "password"} placeholder="Confirm Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>)} />
        <div className="flex justify-between text-sm items-center">
          <div className="text-start  space-x-2 flex flex-start justify-start ">
            <p>
              Show Password
            </p>
            <span>
              <Checkbox className="" onCheckedChange={() => setShowPassword(!showPassword)} />
            </span>
          </div>
        </div>
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Updating" : "Update"}</Button>
      </form>
    </Form>
  )
}

export default ResetPasswordForm
