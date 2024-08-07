import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export default async function middleware(request) {
  let url = new URL(request.url);
  let pathname = url.pathname;

  // Get token from request
  let token = await getToken({ req: request });

  // Define public routes
  let adminPublicRoutes = ['/admin/login'];

  // Check if the path starts with /admin but is not /admin/login
  if (token && adminPublicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  if (!token && pathname.startsWith('/admin') && !adminPublicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
