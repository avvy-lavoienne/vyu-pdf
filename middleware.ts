import { clerkMiddleware } from "@clerk/nextjs/server"

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect all routes except for static files and Next.js internals
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Also match API and trpc routes
    "/(api|trpc)(.*)",
  ],
};
