import { signUp } from "@/actions/action";
import { getAdminQuery, getUserQuery } from "@/SQLqueries/queries";
import { compare } from "bcryptjs";
import { randomUUID } from "crypto";
import NextAuth, { AuthError } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  session: {
    strategy: "jwt",
  },
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
        role: {},
      },
      async authorize(credentials) {
        const parsedCredentials = z.object({
          email: z.string().email(),
          password: z.string(),
          role: z.string()
        }).safeParse(credentials)
        if (parsedCredentials.success) {
          let customUser: RoleBasedUser;
          if (parsedCredentials.data.role === "ADMIN") {
            customUser = (await getAdminQuery(parsedCredentials.data.email))[0] as AdminRole
          } else {
            customUser = (await getUserQuery(parsedCredentials.data.email))[0]
          }
          const matchPassword = await compare(
            parsedCredentials.data.password,
            customUser.password,
          );
          if (!matchPassword) throw new Error("password match failed")
          return customUser
        }
        else throw new AuthError("Input Validation Failed")
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/error",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        let customUser = user as RoleBasedUser;
        if (account?.provider === "google") {
          customUser = (await getUserQuery(user.email!, "GOOGLE"))[0]
        }
        if (customUser.role === "ADMIN") {
          return {
            ...token,
            id: customUser.id,
            email: customUser.email,
            username: customUser.username,
            role: customUser.role,
          };
        }
        return {
          ...token,
          name: customUser.username,
          login_method: customUser.login_method,
          free_tokens: customUser.free_tokens,
          subscription_type: customUser.subscription_type,
          id: customUser.id,
          role: customUser.role,
        } as JWT;
      }
      return token as JWT;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...token,
        },
      };
    },
    async signIn({ user, account }) {
      if (user && account?.provider === "google") {
        const userExists = (await getUserQuery(user.email!, "GOOGLE"))[0]
        // TODO: added user exists
        if (!userExists) {
          const userCreated = await signUp(
            {
              username: user.name!,
              email: user.email!,
              password: user.id || randomUUID(),
              loginMethod: "GOOGLE",
            },
            "USER",
          );
          if (!userCreated) throw new Error("new google user creation failed")
        }
      }
      return true;
    },
  },
});
