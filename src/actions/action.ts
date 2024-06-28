"use server"

import ForgetPasswordTemplate from "@/components/EmailTemplate"
import { signIn } from "@/lib/authJs/auth"
import { AUTH_SECRET, EMAIL } from "@/lib/envValidator"
import { pool } from "@/lib/postgres/pgPool"
import { resend } from "@/lib/resend/resend"
import bcrypt from "bcryptjs"
import { randomUUID } from "crypto"
import jwt from 'jsonwebtoken'

export async function signInToGoogle() {
  await signIn("google", { redirectTo: "/" })
}

export async function signInSingUpUser<T extends string>(type: T, data:
  { email: T, password: T, firstname: T, lastname: T }) {
  const { email, password, firstname, lastname } = data

  if (type === "login") {
    await signIn("credentials", { email, password, redirectTo: "/" })
    return true
  }
  try {
    if (type !== "login") {
      const hashedPassword = await bcrypt.hash(password, 10)
      const signUpUser = await pool.sql`
      INSERT INTO lms_users (
        id, 
        first_name, 
        last_name, 
        email, 
        password, 
        role, 
        subscription_type,
        free_tokens, 
        login_method
      ) VALUES (${randomUUID()}, ${firstname}, ${lastname}, ${email}, ${hashedPassword}, 'user', 'none', 300, 'normal');`;
      if (!signUpUser.rowCount) throw new Error("failed to sign up user")
      return true
    }
  } catch (error) {
    console.log("the error is", error)
    return false
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
  const user = jwt.verify(token, AUTH_SECRET) as { email: string }
  console.log("the user from the email is", user)
  if (!user.email) return false
  const hashedPassword = await bcrypt.hash(password, 10)
  const updatedUser = await pool.sql`
  UPDATE lms_users 
    SET password = ${hashedPassword} 
    WHERE email = ${user.email};`
  if (!updatedUser.rowCount) return false
  return true
}

