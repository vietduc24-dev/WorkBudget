import { NextRequest, NextResponse } from 'next/server';
import { PUBLIC_ROUTES, ROUTES, WHITELIST_ROUTES } from './constants/routes';
import { matchDynamicRoute } from './utils/helper';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;

  const isPublicPath = PUBLIC_ROUTES.some(
    (path) => pathname === path || pathname.startsWith(path)
  );

  // Handle web-view requests
  if (pathname.includes('/web-view/')) {
    let authHeader = request.headers.get('authorization');
    if (authHeader?.includes('Basic')) {
      return NextResponse.next();
    }
    if (authHeader) {
      authHeader = authHeader.replace('Bearer ', '');
      const response = NextResponse.next();
      response.cookies.set('token', authHeader, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return response;
    }
    return NextResponse.next();
  }

  const isWhiteList = () => {
    return WHITELIST_ROUTES?.some((menu: string) =>
      matchDynamicRoute(pathname, menu)
    );
  };

  if (isWhiteList()) {
    return NextResponse.next();
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  // Nếu có token từ header, lưu vào cookie để các request tiếp theo sử dụng
  // if (headerToken && !cookieToken) {
  //   const response = NextResponse.next();
  //   response.cookies.set('token', headerToken, {
  //     httpOnly: false,
  //     secure: process.env.NODE_ENV === 'production',
  //     sameSite: 'strict',
  //     maxAge: 60 * 60 * 24 * 7, // 7 days
  //   });
  //   return response;
  // }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
