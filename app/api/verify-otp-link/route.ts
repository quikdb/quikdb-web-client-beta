import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();

  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    console.log('code:', code);

    if (!code) {
      return NextResponse.json({ error: 'Code parameter is required' }, { status: 400 });
    }

    // Make a POST request to the external service
    const response = await fetch('https://quikdb-core-beta.onrender.com/a/verifyOtp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: code }),
    });

    const result = await response.json();
    console.log('verify-otp-link-result:::', result);
    const { token } = result.data;
    const { email } = result.data.user;

    cookieStore.set({
      name: 'accessToken',
      value: token,
      httpOnly: true,
      path: '/',
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
    });

    cookieStore.set({
      name: 'userEmail',
      value: email,
      path: '/',
    });

    if (!response.ok) {
      return NextResponse.json(result, { status: response.status });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error in /api/verify-otp-link:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
