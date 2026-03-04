import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export const middleware = withAuth(
  function onSuccess(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*'],
};
