import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";
import { middleware as activatedMiddleware } from "@/middleware/config";

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const nextResponse = NextResponse.next();

  const middlewareFunctions = activatedMiddleware.map((fn) => fn(req, event));

  for (const middleware of middlewareFunctions) {
    const result = await middleware;
    if (!result?.ok) {
      return result;
    }
  }
  return nextResponse;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|.*svg|.*png|.*jpg|.*jpeg|.*gif|.*webp|_next/image|favicon.ico).*)",
  ],
};
