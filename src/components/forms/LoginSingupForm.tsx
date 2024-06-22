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
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { passwordSchema } from "@/lib/schema"

const loginSignUpSchema = z.object({
  username: z.string().min(2, {
    message: "Must have at least 2 characters"
  }).max(100, {
    message: "Must have at most 100 characters"
  }),
  email: z.string().email({ message: "Must be a valid email adress" }),
  password: passwordSchema
})


export default function LoginSignupForm() {
  const pathname = usePathname()
  const isSignUpPage = pathname.includes("signup")
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<z.infer<typeof loginSignUpSchema>>({
    resolver: zodResolver(loginSignUpSchema),
    defaultValues: {
      username: isSignUpPage ? "" : "hh",
      email: "",
      password: ""
    }

  })

  function onSubmit(data: z.infer<typeof loginSignUpSchema>) {
    signInSingUpUser("login", data)
  }
  return (
    <Form {...form}  >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2" >
        {pathname.includes("signup") && (
          <FormField control={form.control} name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl><Input placeholder="username" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
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

        <Button type="submit">{isSignUpPage ? "Sign Up" : "Log In"}</Button>
      </form >
    </Form >
  )
}

export { loginSignUpSchema }
