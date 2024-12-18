import { cookies } from 'next/headers';
import { CryptoUtils } from '@quikdb/design-system/lib/cryptoUtils';

export async function GET(req: Request) {
  const body = await req.json();
  const { principalId } = body;

  try {
    const encryptedData = CryptoUtils.aesEncrypt(JSON.stringify({ principalId }), 'mysecurekey1234567890', 'uniqueiv12345678');

    const response = await fetch('https://quikdb-core-beta.onrender.com/a/signinWithII', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: encryptedData }),
    });

    console.log('sign-in-with-ii-result:', response);
    const result = await response.json();

    return new Response(JSON.stringify(result), { status: response.status });
  } catch (error) {
    console.error('Error in /api/sign-up:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
