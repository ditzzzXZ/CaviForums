import { NextResponse } from 'next/server';

export default function (request) {
  const { pathname } = request.nextUrl;
  
  // 1. Skip system files
  if (
    pathname.startsWith('/_next') || 
    pathname.includes('/api/') || 
    pathname.includes('.')
  ) {
    return;
  }

  // 2. Define locales
  const locales = ['en', 'id', 'ms', 'ja', 'zh', 'es', 'es-MX'];
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // 3. Redirect if missing locale
  if (!hasLocale) {
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
