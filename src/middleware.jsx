import { NextResponse } from 'next/server';

export function middleware(req) {
  
  const url = req.nextUrl.clone();

   
  url.pathname = url.pathname.replace(/\/{2,}/g, '/');

 
  if (url.pathname !== req.nextUrl.pathname) {
    return NextResponse.redirect(url);
  }


  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
