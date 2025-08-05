import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  const isAuth = !!token;
  const isAuthPage = request.nextUrl.pathname === "/login";
  const isProtected = ["/users", "/products", "/suppliers", "/customer"]
    .some(path => request.nextUrl.pathname.startsWith(path));

  if (!isAuth && isProtected) {

    return new NextResponse("Página não encontrada", { status: 404 });
  }

  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL("/customer", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/users/:path*", "/products/:path*", "/suppliers/:path*", "/customer/:path*", "/login"],
};