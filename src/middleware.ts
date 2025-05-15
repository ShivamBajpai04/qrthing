import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api(.*)",
  "/",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Include all routes, including API routes
    "/(.*)",
    // Exclude static assets and images
    "/((?!_next/static|.*svg|.*png|.*jpg|.*jpeg|.*gif|.*webp|_next/image|favicon.ico).*)",
  ],
};
