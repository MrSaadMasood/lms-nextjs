import { Session } from "next-auth";

export function navbarLinkGenerator(role: Roles, toAdd: string) {
  return `/dashboard/${role.toLowerCase()}${toAdd}`;
}

export function userExtractor(session: Session | null) {
  if (!session) throw new Error("Autentication Error");
  if (session.user.role === "USER") return session.user;
}
export function adminExtractor(session: Session | null) {
  if (!session) throw new Error("Autentication Error");
  if (session.user.role === "ADMIN") return session.user;
}
