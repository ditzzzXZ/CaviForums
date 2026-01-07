import { NextResponse } from 'next/server';

// Next.js now expects the function name to match the filename "proxy"
export function proxy(request) {
  const { pathname } = request.nextUrl;
  
  // Skip system files and images
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

  // If no language is present, redirect to English (/en)
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
