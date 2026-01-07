import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // 1. Skip system files
  if (pathname.includes('.') || pathname.startsWith('/_next')) return;

  // 2. Define your 7 languages
  const locales = ['en', 'id', 'ms', 'ja', 'zh', 'es', 'es-MX'];
  
  // 3. Check if URL already has one
  const hasLocale = locales.some(l => pathname.startsWith(`/${l}/`) || pathname === `/${l}`);

  // 4. If no language, go to /en
  if (!hasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
