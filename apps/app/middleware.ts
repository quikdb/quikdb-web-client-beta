import { NextResponse } from 'next/server';
import { parseCookies } from 'nookies';

export function middleware(req: any) {
  // const cookies = parseCookies({ req });
  // console.log('Cookies:', cookies);  // Check if cookies are being parsed correctly
  // const accessToken = cookies.accessToken;

  // if (!accessToken) {
  //   const url = req.nextUrl.clone();
  //   url.pathname = '/sign-in';  // Redirect to /sign-in if token is not found
  //   console.log('Access Token Not Found:', accessToken);  // Log if no access token is found
  //   return NextResponse.redirect(url);
  // }

  // return NextResponse.next();  // Continue if access token exists
}


export const config = {
  matcher: ['/overview', '/projects', '/add-collaborators', '/access-token', '/analytics', '/rewards', '/data-backup', '/user-invite', '/user-mgt'],
};
