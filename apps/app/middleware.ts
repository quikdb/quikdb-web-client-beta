import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(req: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/overview',
    '/projects',
    '/add-collaborators',
    '/access-token',
    '/analytics',
    '/rewards',
    '/data-backup',
    '/user-invite',
    '/user-mgt',
    '/project/:path*',
    '/checkout/:path*',
    // 'notifications',
  ],
};
