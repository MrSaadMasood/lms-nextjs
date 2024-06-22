import { auth } from "@/lib/authJs/auth"

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname === "/dashboard") return Response.redirect(
    new URL("/login", req.nextUrl.origin)
  )
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/dashboard/:path*"],
}

