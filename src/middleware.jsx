import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export default async function middleware(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Get token from request
  const token = await getToken({ req: request });
  const user = token?.user;

  // Define public routes
  const adminPublicRoutes = ['/admin/login'];
  const userPublicRoutes = ['/login'];

  // Define private routes
  const adminPrivateRoutes = ['/admin/dashboard'];
  const userPrivateRoutes = ['/dashboard'];

  // Redirect admin users who are trying to access public routes
  if (token && user.role === 'admin' && userPublicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // Redirect users who are trying to access admin routes
  if (token && user.role === 'user' && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect unauthenticated users trying to access private routes
  if (!token && (userPrivateRoutes.includes(pathname) || pathname.startsWith('/dashboard'))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect unauthenticated users trying to access admin routes
  if (!token && pathname.startsWith('/admin') && !adminPublicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Proceed with request if no redirects
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard',
    '/login',
  ],
};
