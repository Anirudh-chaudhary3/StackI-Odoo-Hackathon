import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect all routes except the home page `/` and static assets
    '/((?!_next|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|css|js|json|ico|woff2?)$|$).*)',
  ],
};
