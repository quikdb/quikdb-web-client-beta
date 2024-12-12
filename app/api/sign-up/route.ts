import { cookies } from 'next/headers';
import { CryptoUtils } from '@quikdb/design-system/lib/cryptoUtils';

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const encryptedSignupData = cookieStore.get('signupData')?.value;

  if (!encryptedSignupData) {
    return new Response(JSON.stringify({ error: 'Missing signup data' }), { status: 400 });
  }

  const decryptedData = CryptoUtils.aesDecrypt(encryptedSignupData, 'mysecurekey1234567890', 'uniqueiv12345678');
  const { email, password } = JSON.parse(decryptedData);

  try {
    const encryptedData = CryptoUtils.aesEncrypt(
      JSON.stringify({ email, password }),
      'mysecurekey1234567890',
      'uniqueiv12345678'
    );

    const response = await fetch('https://quikdb-core-beta.onrender.com/a/signupWithEP', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: encryptedData }),
    });

    const result = await response.json();

    if (response.ok && result.status === 'success') {
      cookieStore.delete('signupData');
      return new Response(JSON.stringify(result), { status: 200 });
    }

    return new Response(JSON.stringify(result), { status: response.status });
  } catch (error) {
    console.error('Error in /api/sign-up:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
