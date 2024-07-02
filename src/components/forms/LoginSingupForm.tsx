'use client'
import { signInSingUpUser } from "@/actions/action"
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useToaster from "@/hooks/useToaster"
import { nameSchema, passwordSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"

const loginSignUpSchema = z.object({
  firstname: nameSchema,
  lastname: nameSchema,
  email: z.string().email({ message: "Must be a valid email adress" }),
  password: passwordSchema
})


export default function LoginSignupForm() {
  const pathname = usePathname()
  const isSignUpPage = pathname.includes("signup")
  const [showPassword, setShowPassword] = useState(false)
  const { errorToast } = useToaster()
  const router = useRouter()
  const form = useForm<z.infer<typeof loginSignUpSchema>>({
    resolver: zodResolver(loginSignUpSchema),
    defaultValues: {
      firstname: isSignUpPage ? "" : "hh",
      lastname: isSignUpPage ? "" : "hh",
      email: "",
      password: ""
    }
  })
  const { formState: { isSubmitting } } = form

  async function onSubmit(data: z.infer<typeof loginSignUpSchema>) {
    const isSuccess = await signInSingUpUser(isSignUpPage ? "signup" : "login", data)
    if (isSignUpPage) {
      if (!isSuccess) return errorToast("Authentication Failed")
      router.push("/login")
    }
  }
  return (
    <Form {...form}  >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2" >
        {pathname.includes("signup") && (
          <>
            <FormField control={form.control} name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl><Input placeholder="John" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <FormField control={form.control} name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl><Input placeholder="Doe" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
          </>
        )}
        <FormField control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl >
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        <FormField control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" type={showPassword ? "text" : "password"} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        <div className="flex justify-between text-sm items-center">
          <div className="text-start  space-x-2 flex flex-start justify-start ">
            <p>
              Show Password
            </p>
            <span>
              <Checkbox className="" onCheckedChange={() => setShowPassword(!showPassword)} />
            </span>
          </div>
          {!isSignUpPage && <Link className="text-end text-violet-700 hover:text-violet-900 font-bold"
            href={"/forgot-password"}>Forgot Password ?</Link>}
        </div>

        <Button type="submit" disabled={isSubmitting}>{isSignUpPage ?
          isSubmitting ? "Signing Up" : "Sign Up" : isSubmitting ? "Logging In" : "Log In"}
        </Button>

      </form >
    </Form >
  )
}

export { loginSignUpSchema }