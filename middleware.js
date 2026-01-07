import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const locales = ['en', 'id', 'ms', 'ja', 'zh', 'es', 'es-MX'];
  const isMissing = locales.every(l => !pathname.startsWith(`/${l}/`) && pathname !== `/${l}`);

  if (isMissing) {
    const locale = request.headers.get('accept-language')?.split(',')?.[0].split('-')?.[0] || 'en';
    return NextResponse.redirect(new URL(`/${locales.includes(locale) ? locale : 'en'}${pathname}`, request.url));
  }
}
export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] };
