"use server"

import { resetPasswordQueries, signUpBasedOnRoleQuery } from "@/SQLqueries/queries"
import ForgetPasswordTemplate from "@/components/EmailTemplate"
import { signIn } from "@/lib/authJs/auth"
import { AUTH_SECRET, EMAIL } from "@/lib/envValidator"
import { resend } from "@/lib/resend/resend"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export async function signInToGoogle() {
  await signIn("google", { redirectTo: "/" })
}

export async function signInSignUpUser<T extends string>(type: T, data:
  { email: T, password: T, username: T, loginMethod?: T }, role: Roles) {
  const { email, password, username, loginMethod = 'normal' } = data

  if (type === "login") {
    await signIn("credentials", { email, password, role, redirectTo: "/" })
    return true
  }
  try {
    if (type !== "login") {
      const hashedPassword = await bcrypt.hash(password, 10)
      await signUpBasedOnRoleQuery(username, email, hashedPassword, loginMethod, role)
      return true
    }
  } catch (error) {
    console.log("the error is", error)
    return false
  }
}

export async function sendEmail(email: string, role: Roles) {
  const token = jwt.sign({ email }, AUTH_SECRET, { expiresIn: "1h" })
  const response = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: EMAIL,
    subject: 'Reset Password',
    react: ForgetPasswordTemplate({
      username: "alan",
      invitedByUsername: "LMS",
      invitedByEmail: "mrsaadmasood1@gmail.com",
      inviteLink: `reset-password/${token}?role=${role}`
    })
  })
  return {
    error: response.error
  }
}

export async function updateUserPassword(token: string, password: string, role: Roles) {
  const user = jwt.verify(token, AUTH_SECRET) as { email: string }
  if (!user.email) return false
  const hashedPassword = await bcrypt.hash(password, 10)
  return await resetPasswordQueries(user.email, hashedPassword, role)
}

