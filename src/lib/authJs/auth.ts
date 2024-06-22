import NextAuth from "next-auth"
import credentials from "next-auth/providers/credentials"
import Google from 'next-auth/providers/google'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    credentials({
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        console.log("the credentials are", credentials.email, credentials.password)
        return { id: "1", email: credentials.email as string, password: credentials.password as string }
      }
    })
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/error"
  },
  callbacks: {
    jwt({ token, user }) {
      console.log("the token is", token, "the user is", user)
      return token
    },
    session({ session, token, user }) {
      console.log("the token", token, "the user", user, "the session", session)
      return session
    }
  }
})
