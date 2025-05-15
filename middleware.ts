import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { generateRandomPageId } from "./lib/randomPageId";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname === "/") {
    const randomId = generateRandomPageId();
    url.pathname = `/${randomId}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
