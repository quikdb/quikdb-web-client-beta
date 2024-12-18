import { cookies } from 'next/headers';
import { CryptoUtils } from '@quikdb/design-system/lib/cryptoUtils';

export async function POST(req: Request) {
  const cookieStore = await cookies();

  try {
    const body = await req.json();
    const { principalId } = body;

    console.log('Principal ID:', principalId);

    if (!principalId) {
      return new Response(JSON.stringify({ error: 'Missing principalId' }), { status: 400 });
    }

    const data = JSON.stringify({ principalId });
    const encryptedData = CryptoUtils.aesEncrypt(data, 'mysecurekey1234567890', 'uniqueiv12345678');

    console.log('Encrypted Data:', encryptedData);

    const response = await fetch('https://quikdb-core-beta.onrender.com/a/signinWithII', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: encryptedData }),
    });

    const result = await response.json();

    console.log('sign-in-with-ii-result:', result);

    if (response.ok && result.status === 'success') {
      const { accessToken } = result.data;

      cookieStore.set({
        name: 'accessToken',
        value: accessToken,
        httpOnly: true,
        path: '/',
        secure: true,
        maxAge: 60 * 60 * 24 * 30,
      });

      return new Response(JSON.stringify({ ...result, redirect: '/overview' }), { status: response.status });
    }
    return new Response(JSON.stringify(result), { status: response.status });
  } catch (error) {
    console.error('Error in /api/sign-up-ii:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
