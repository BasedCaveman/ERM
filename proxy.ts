import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const hostname = request.headers.get('host')?.split(':')[0] ?? '';
  const facilitatorHost = process.env.FACILITATOR_HOST;
  const isFacilitatorHost = facilitatorHost
    ? hostname === facilitatorHost
    : hostname.startsWith('facilitador.');

  if (!isFacilitatorHost || request.nextUrl.pathname.startsWith('/facilitador')) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/facilitador';
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|icon.svg|manifest.json|sw.js).*)'],
};
