"use server"

import ForgetPasswordTemplate from "@/components/EmailTemplate"
import { signIn } from "@/lib/authJs/auth"
import { resend } from "@/lib/resend/resend"
import { env } from '@/lib/envValidator'
import jwt from 'jsonwebtoken'

const { AUTH_SECRET, EMAIL } = env

export async function signInToGoogle() {
  await signIn("google", { redirectTo: "/" })
}

export async function signInSingUpUser<T extends string>(type: T, data:
  { email: T, password: T, username: T }) {
  const { email, password, username } = data
  if (type === "login") await signIn("credentials", { email, password, redirectTo: "/" })
  else {
    console.log("the user is now being created in the database", username)
  }
}

export async function sendEmail(email: string) {
  const token = jwt.sign({ email }, AUTH_SECRET, { expiresIn: "1h" })
  const response = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: EMAIL,
    subject: 'Reset Password',
    react: ForgetPasswordTemplate({
      username: "alan",
      invitedByUsername: "LMS",
      invitedByEmail: "mrsaadmasood1@gmail.com",
      inviteLink: `reset-password/${token}`
    })
  })
  return {
    error: response.error
  }
}

export async function updateUserPassword(token: string, password: string) {
  const user = jwt.verify(token, AUTH_SECRET)
  console.log("the user from the email is", user)
  return password
}
