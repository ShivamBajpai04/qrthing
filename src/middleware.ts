import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define routes that should be accessible without authentication
const isPublicRoute = createRouteMatcher([
  "/", // Home page
  "/sign-in(.*)", // Sign-in pages
  "/api/scan/(.*)", // QR code scanning endpoints should be public
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\.ico$|favicon.ico).*)",
    // Always include API routes (except scan endpoints which are handled by isPublicRoute)
    "/api/((?!scan).*)",
  ],
};
