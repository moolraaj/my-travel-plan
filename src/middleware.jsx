import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import geoip from 'geoip-lite';

export default async function middleware(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Get the IP address from the request headers
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || request.ip;
    const geo = geoip.lookup(ip);

    // Check if the user is located in Malaysia
    if (geo && geo.country === 'MY') {
        // Redirect to the Malaysia-specific domain
        const malaysianUrl = new URL(url);
        malaysianUrl.hostname = 'mieland.com.my';
        return NextResponse.redirect(malaysianUrl.toString());
    }

    // Get token from request
    const token = await getToken({ req: request });
    const user = token?.user;

    // Define public routes
    const adminPublicRoutes = ['/admin/login'];
    const userPublicRoutes = ['/login'];

    // Define private routes
    const adminPrivateRoutes = ['/admin/dashboard'];
    const userPrivateRoutes = ['/dashboard'];

    // Redirect admin users who are trying to access user public routes
    if (token && user.role === 'admin' && userPublicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    // Redirect regular users who are trying to access user public routes
    if (token && user.role === 'user' && userPublicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL(request.headers.get('referer') || '/dashboard', request.url));
    }

    // Redirect users with role 'user' who are trying to access admin routes, except '/admin/login'
    if (token && user.role === 'user' && pathname.startsWith('/admin') && !adminPublicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Redirect unauthenticated users trying to access private user routes
    if (!token && userPrivateRoutes.includes(pathname)) {
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
