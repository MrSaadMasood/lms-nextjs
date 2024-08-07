"use server";

import { resetPasswordQueries, signUpBasedOnRoleQuery } from "@/SQLqueries/queries";
import ForgetPasswordTemplate from "@/components/EmailTemplate";
import { signIn } from "@/lib/authJs/auth";
import { AUTH_SECRET, EMAIL } from "@/lib/envValidator";
import { resend } from "@/lib/resend/resend";
import { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

export async function signInToGoogle() {
  await signIn("google", { redirectTo: "/dashboard/user/main" });
}

export async function login<T extends string>(
  email: T,
  password: T,
  role: Roles,
) {
  console.log("inside the login function")
  try {
    await signIn("credentials", { email, password, role, redirect: false });
    return true
  } catch (error) {
    console.log("error occured while signin", error)
    return false

  }
}

export async function signUp<T extends string>(
  data: { email: T; password: T; username: T; loginMethod?: LoginMethod },
  role: Roles,
) {
  const { email, password, username, loginMethod = "NORMAL" } = data;
  try {
    const hashedPassword = await hash(password, 10);
    await signUpBasedOnRoleQuery(username, email, hashedPassword, loginMethod, role);
    return true
  } catch (error) {
    console.log("error occured while signing up", error);
    return false;
  }
}

export async function sendEmail(email: string, role: Roles) {
  const token = jwt.sign({ email }, AUTH_SECRET, { expiresIn: "1h" });
  const response = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: EMAIL,
    subject: "Reset Password",
    react: ForgetPasswordTemplate({
      username: "alan",
      invitedByUsername: "LMS",
      invitedByEmail: "mrsaadmasood1@gmail.com",
      inviteLink: `reset-password/${token}?role=${role}`,
    }),
  });
  return {
    error: response.error,
  };
}

export async function updateUserPassword(token: string, password: string, role: Roles) {
  const user = jwt.verify(token, AUTH_SECRET) as { email: string };
  if (!user.email) return false;
  try {
    const hashedPassword = await hash(password, 10);
    return await resetPasswordQueries(user.email, hashedPassword, role);
  } catch (error) {
    console.log("failed to updaate the password")
    return false

  }
}
