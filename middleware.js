import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // This helps avoid an infinite redirect loop
  if (
    pathname.startsWith('/_next') || 
    pathname.includes('/api/') || 
    pathname.includes('.')
  ) {
    return;
  }

  const locales = ['en', 'id', 'ms', 'ja', 'zh', 'es', 'es-MX'];
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // If there's no language in the URL, redirect to /en
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
