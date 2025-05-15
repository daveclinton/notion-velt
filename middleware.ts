import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { pageTree } from "./lib/mock-data";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname === "/") {
    const defaultPageId = pageTree[0]?.id || "page-1";
    url.pathname = `/${defaultPageId}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
