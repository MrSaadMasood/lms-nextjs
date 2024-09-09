import NextAuth, { DefaultSession } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: RoleBasedUser & DefaultSession["user"];
  }
  interface User extends RoleBasedUser { }
}

declare module "next-auth/jwt" {
  interface JWT extends RoleBasedUser { }
}
