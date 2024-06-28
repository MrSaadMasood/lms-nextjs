import PostgresAdapter from "@auth/pg-adapter"
import NextAuth from "next-auth"
import credentials from "next-auth/providers/credentials"
import Google from 'next-auth/providers/google'
import { pool } from "../postgres/pgPool"
import bcrypt from "bcryptjs"
import { AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET } from "../envValidator"

export const { handlers, signIn, signOut, auth } = NextAuth({

  providers: [
    credentials({
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        // const client = await pool.connect()
        // const userExists = await client.sql`select * from lms_users where email = ${credentials.email as string};`
        // const matchPassword = await bcrypt.compare(credentials.password as string, userExists.rows[0].password)
        // if (!matchPassword) throw new Error("Failed to Login User")
        // client.release()
        // return userExists.rows[0]
        return { name: "hello", email: "heelo@gmail.com" }
      }
    }),
    Google,
  ],
  adapter: PostgresAdapter(pool),
  debug: true,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/error"
  },
  callbacks: {
    jwt({ token, user, session, account, profile, trigger }) {
      return token
    },
    session({ session, token, user }) {
      return session
    },
    signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        console.log("The user in the signin is", user)
        return true
      }
      return false
    }
  }
})
