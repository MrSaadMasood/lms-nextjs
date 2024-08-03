import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { getAdminQuery, getUserQuery } from "@/SQLqueries/queries";
import { QueryResult } from "pg";
import { signUp } from "@/actions/action";
import { pool } from "../postgres/pgPool";
import { sql } from "@vercel/postgres";
import { custom, z } from "zod";
import PostgresAdapter from '@auth/pg-adapter'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(pool),
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
          let customUser: QueryResult<RoleBasedUser> | null;
          if (credentials.role === "admin") {
            customUser = await getAdminQuery(credentials.email as string);
          } else {
            customUser = await getUserQuery(credentials.email as string);
          }
          if (!customUser) return null
          const matchPassword = await bcrypt.compare(
            credentials.password as string,
            customUser.rows[0].password,
          );
          // if (!matchPassword) throw new Error("Failed to Login User");
          if (!matchPassword) return null
          return customUser.rows[0];
        }
        return null
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
          const googleUser = await getUserQuery(token.email!, "google");
          // TODO: add google user if statement
          if (!googleUser) throw new Error("failed to do something")
          if (!googleUser.rowCount) throw new Error("Failed to get the google user");
          customUser = googleUser.rows[0];
        }
        if (customUser.role === "admin") {
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
          first_name: customUser.first_name,
          last_name: customUser.last_name,
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
      if (account?.provider === "google") {
        const userExists = await getUserQuery(user.email!, "google");
        console.log("the user exists is", userExists)
        // TODO: added user exists
        if (userExists && !userExists.rowCount) {
          const userCreated = await signUp(
            {
              username: user.name!,
              email: user.email!,
              password: user.id || randomUUID(),
              loginMethod: "google",
            },
            "user",
          );
          if (!userCreated) return false;
        }
      }
      return true;
    },
  },
});
