import { NextResponse } from 'next/server';

/**
 * Next.js Turbopack specifically looks for an exported function 
 * named "proxy" when the file is named proxy.js.
 */
export function proxy(request) {
  const { pathname } = request.nextUrl;

  // 1. Let system files pass through without redirecting
  if (
    pathname.startsWith('/_next') || 
    pathname.includes('/api/') || 
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2. Define our 7 languages
  const locales = ['en', 'id', 'ms', 'ja', 'zh', 'es', 'es-MX'];
  
  // 3. Check if the current URL already has one of these languages
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // 4. If no language is found, redirect to /en
  if (!hasLocale) {
    const url = new URL(`/en${pathname}`, request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Ensure the proxy runs on all routes except static assets
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
