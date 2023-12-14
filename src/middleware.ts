import { decode } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const sessionToken =
    req.cookies.get("__Secure-next-auth.session-token")?.value || null;

  if (sessionToken === null) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const decoded = await decode({
    token: sessionToken!,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const raw = await fetch("https://m2vira.vercel.app/api/permissions", {
    method: "POST",
    body: JSON.stringify({ email: decoded!.email }),
  });

  const res = await raw.json();

  return res.isAdmin
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: [
    "/api/users/all",
    "/api/products/create",
    "/api/products/edit",
    "/products/create",
    "/products/edit/:path*",
    "/admin/home",
    "/admin/products",
    "/admin/users",
  ],
};
