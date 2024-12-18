import { cookies } from 'next/headers';
import { CryptoUtils } from '@quikdb/design-system/lib/cryptoUtils';

export async function POST(req: Request) {
  const cookieStore = await cookies();

  try {
    const body = await req.json();
    const { email, password } = body;

    const encryptedData = CryptoUtils.aesEncrypt(JSON.stringify({ email, password }), 'mysecurekey1234567890', 'uniqueiv12345678');

    const response = await fetch('https://quikdb-core-beta.onrender.com/a/signinWithEP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: encryptedData }),
    });

    const result = await response.json();
    console.log('sign-in-result:::', result);

    if (response.ok && result.status === 'success') {
      const { accessToken } = result.data;
      const { email } = result.data.user;

      cookieStore.set({
        name: 'accessToken',
        value: accessToken,
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
      return new Response(JSON.stringify({ ...result, redirect: '/overview' }), { status: response.status });
    }
    return new Response(JSON.stringify(result), { status: response.status });
  } catch (error) {
    console.error('Error in /api/sign-in:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
