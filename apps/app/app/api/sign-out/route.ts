import { cookies } from 'next/headers';
import { CryptoUtils } from '@repo/design-system/lib/cryptoUtils';

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value
  console.log('token::', token);

  try {
    const body = await req.json();
    const { email, password } = body;

    const encryptedData = CryptoUtils.aesEncrypt(JSON.stringify({ email, password }), 'mysecurekey1234567890', 'uniqueiv12345678');

    const response = await fetch('https://quikdb-core-beta.onrender.com/a/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ data: encryptedData }),
    });

    const result = await response.json();

    if (response.ok && result.status === 'success') {
      cookieStore.delete('accessToken');
      cookieStore.delete('userEmail');

      return new Response(JSON.stringify({ ...result, redirect: '/sign-in' }), { status: response.status });
    }
    return new Response(JSON.stringify(result), { status: response.status });
  } catch (error) {
    console.error('Error in /api/sign-out:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
