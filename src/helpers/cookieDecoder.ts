import { decode } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function decodeCookie(request: NextRequest): Promise<any> {
  const sessionToken =
    request.cookies.get(process.env.AUTH_COOKIE_NAME!)?.value || null;

  if (sessionToken === null) return null;

  const decoded = await decode({
    token: sessionToken!,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return decoded === null ? null : decoded;
}
