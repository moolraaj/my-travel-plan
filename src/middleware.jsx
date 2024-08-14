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

  // Get the country code from the request's geolocation data
  const country = request.geo?.country || '';

  // Country-based redirection
  if (country === 'MY') {
    return NextResponse.redirect('https://mieland.com.my');
  }

  if (country === 'US') {
    return NextResponse.redirect('https://www.eligocs.com');
  }

  // Role-based redirection logic
  if (token) {
    if (user.role === 'admin') {
      // Redirect admin users who are trying to access user public routes
      if (userPublicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
    } else if (user.role === 'user') {
      // Redirect regular users who are trying to access user public routes
      if (userPublicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL(request.headers.get('referer') || '/dashboard', request.url));
      }

      // Redirect users with role 'user' who are trying to access admin routes, except '/admin/login'
      if (pathname.startsWith('/admin') && !adminPublicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  } else {
    // Redirect unauthenticated users trying to access private user routes
    if (userPrivateRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Redirect unauthenticated users trying to access admin routes
    if (pathname.startsWith('/admin') && !adminPublicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
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
