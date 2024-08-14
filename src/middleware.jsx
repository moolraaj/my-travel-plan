import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export default async function middleware(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Access Netlify's geolocation headers
    const geoCountry = request.headers.get('x-nf-geo-country');

    // Check if the user is located in Malaysia
    if (geoCountry === 'MY') {
        // Redirect to the Malaysia-specific domain
        const malaysianUrl = new URL(url);
        malaysianUrl.hostname = 'mieland.com.my';
        return NextResponse.redirect(malaysianUrl.toString());
    }

    // The rest of your existing logic...
    const token = await getToken({ req: request });
    const user = token?.user;

    const adminPublicRoutes = ['/admin/login'];
    const userPublicRoutes = ['/login'];
    const adminPrivateRoutes = ['/admin/dashboard'];
    const userPrivateRoutes = ['/dashboard'];

    if (token && user.role === 'admin' && userPublicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    if (token && user.role === 'user' && userPublicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL(request.headers.get('referer') || '/dashboard', request.url));
    }

    if (token && user.role === 'user' && pathname.startsWith('/admin') && !adminPublicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (!token && userPrivateRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (!token && pathname.startsWith('/admin') && !adminPublicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/dashboard',
        '/login',
    ],
};
