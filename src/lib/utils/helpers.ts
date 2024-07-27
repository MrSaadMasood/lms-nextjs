import { Session } from "next-auth";

export function navbarLinkGenerator(type: Roles, toAdd: string) {
  return `/dashboard/${type}${toAdd}`;
}

export function userExtractor(session: Session | null) {
  if (!session) throw new Error("Autentication Error");
  if (session.user.role === "user") return session.user;
}
export function adminExtractor(session: Session | null) {
  if (!session) throw new Error("Autentication Error");
  if (session.user.role === "admin") return session.user;
}
