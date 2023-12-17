import { NextRequest, NextResponse } from "next/server";
import { decodeCookie } from "./helpers/cookieDecoder";
import { isAdminByEmail } from "./services/authService";

export default async function middleware(request: NextRequest) {
  const isAdminRoute: boolean = adminRoutesArray.some((url) =>
    request.url.replace(process.env.DOMAIN!, "").startsWith(url)
  );
  const isAuthenticatedRoute: boolean = authenticatedRoutesArray.some((url) =>
    request.url.replace(process.env.DOMAIN!, "").startsWith(url)
  );

  if (isAdminRoute) {
    return adminRoutes(request);
  } else if (isAuthenticatedRoute) {
    return authenticatedRoutes(request);
  }
}

async function adminRoutes(request: NextRequest) {
  const decoded = await decodeCookie(request);

  if (decoded === null) {
    if (request.url.includes("/api/")) {
      return NextResponse.json({ message: "No access!", status: 403 });
    } else {
      return NextResponse.redirect(new URL("/noaccess", request.url));
    }
  }

  const isAdmin = await isAdminByEmail();

  if (!isAdmin) {
    if (request.url.includes("/api/")) {
      return NextResponse.json({ message: "No access!", status: 403 });
    } else {
      return NextResponse.redirect(new URL("/noaccess", request.url));
    }
  }
}

async function authenticatedRoutes(request: NextRequest) {
  const decoded = await decodeCookie(request);

  if (decoded === null) {
    if (request.url.includes("/api/")) {
      return NextResponse.json({ message: "Unauthorized!", status: 401 });
    } else {
      return NextResponse.redirect(new URL("/unauthenticated", request.url));
    }
  }
}

const adminRoutesArray = [
  "/admin/home",
  "/admin/products",
  "/admin/promocodes",
  "/admin/promocodes/create",
  "/admin/users",
  "/products/create",
  "/products/edit",
  "/api/products/create",
  "/api/products/delete",
  "/api/products/edit",
  "/api/promocodes/all",
  "/api/promocodes/create",
  "/api/promocodes/delete",
  "/api/users/all",
  "/api/users/delete",
];

const authenticatedRoutesArray = [
  "/cart/mine",
  "/cart/checkout/",
  "/api/cart/add",
  "/api/cart/delete",
  "/api/cart/add",
  "/api/cart/order",
  "/favorites",
  "/api/favorites/add",
  "/api/favorites/all",
  "/api/favorites/remove",
  "/profile",
  "/api/orders",
  "/api/promocodes/validate",
];

const allRoutes = [...adminRoutesArray, ...authenticatedRoutesArray];

export const config = {
  matcher: allRoutes,
};
