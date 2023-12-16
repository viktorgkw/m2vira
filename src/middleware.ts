import { NextRequest, NextResponse } from "next/server";
import { decode } from "next-auth/jwt";

export default async function middleware(req: NextRequest) {
  const sessionToken =
    req.cookies.get(process.env.AUTH_COOKIE_NAME!)?.value || null;

  if (sessionToken === null) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const decoded = await decode({
    token: sessionToken!,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const raw = await fetch(`${process.env.DOMAIN}/api/permissions`, {
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
    "/api/promocodes/all",
    "/api/promocodes/delete",
    "/api/promocodes/create",
    "/api/users/all",
    "/api/users/delete",
    "/api/products/create",
    "/api/products/delete",
    "/api/products/edit",
    "/products/create",
    "/products/edit/:path*",
    "/admin/home",
    "/admin/products",
    "/admin/users",
    "/admin/promocodes",
    "/admin/promocodes/create",
  ],
};
