import { signInSignUpUser } from "@/actions/action"
import bcrypt from "bcryptjs"
import { randomUUID } from "crypto"
import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
import Credentials from "next-auth/providers/credentials"
import Google from 'next-auth/providers/google'
import { getAdminQuery, getUserQuery } from "@/SQLqueries/queries"
import { QueryResult } from "pg"

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt"
  },
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
        role: {}
      },
      async authorize(credentials) {
        let customUser: QueryResult<RoleBasedUser>
        if (credentials.role === "admin") {
          customUser = await getAdminQuery(credentials.email as string)
        }
        else {
          customUser = await getUserQuery(credentials.email as string)
        }
        const matchPassword = await bcrypt.compare(credentials.password as string, customUser.rows[0].password)
        if (!matchPassword) throw new Error("Failed to Login User")
        return customUser.rows[0]
      }
    })
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/error"
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        let customUser = user as RoleBasedUser
        if (account?.provider === "google") {
          const googleUser = await getUserQuery(token.email!, 'google')
          if (!googleUser.rowCount) throw new Error("Failed to get the google user")
          customUser = googleUser.rows[0]
        }
        if (customUser.role === "admin") {
          return {
            ...token,
            id: customUser.id,
            email: customUser.email,
            username: customUser.username
          }
        }
        return {
          ...token,
          first_name: customUser.first_name,
          last_name: customUser.last_name,
          login_method: customUser.login_method,
          free_tokens: customUser.free_tokens,
          subscription_type: customUser.subscription_type,
          id: customUser.id,
          role: customUser.role
        } as JWT
      }
      return token as JWT
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...token
        }
      }
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const userExists = await getUserQuery(user.email!, "google")
        if (!userExists.rowCount) {

          const userCreated = await signInSignUpUser("signup", {
            username: user.name!,
            email: user.email!,
            password: user.id || randomUUID(),
            loginMethod: 'google'
          }, 'user')
          if (!userCreated) return false
        }
      }
      return true
    }
  }
})
