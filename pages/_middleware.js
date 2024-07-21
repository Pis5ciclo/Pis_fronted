import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl.clone();
  const token = req.cookies['token_person']; 
  if (url.pathname === '/' || url.pathname.startsWith('/_next/') || url.pathname.startsWith('/image/')) {
    return NextResponse.next();
  }

  if (!token) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
