import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "index, follow");

  if (req.nextUrl.pathname.startsWith("/admin")) {
    response.headers.set("Cache-Control", "no-store");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
