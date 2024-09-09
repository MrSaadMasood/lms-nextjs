import { auth } from "@/lib/authJs/auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith("/dashboard"))
    return Response.redirect(new URL("/login", req.nextUrl.origin));

  if (
    req.auth &&
    req.auth.user.role === "USER" &&
    req.nextUrl.pathname.startsWith("/dashboard/admin")
  )
    return Response.redirect(new URL("/dashboard/user", req.nextUrl.origin));

  if (
    req.auth &&
    req.auth.user.role === "ADMIN" &&
    req.nextUrl.pathname.startsWith("/dashboard/user")
  )
    return Response.redirect(new URL("/dashboad/admin", req.nextUrl.origin));
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  unstable_allowDynamic: ["**/node_modules/@react-email/**/*.mjs"],
};
