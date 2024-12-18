import { cookies } from 'next/headers';
import { CryptoUtils } from '@quikdb/design-system/lib/cryptoUtils';

export async function POST(req: Request) {
  const cookieStore = await cookies();

  try {
    const body = await req.json();
    const { email, password } = body;
    // const type = 'recover-password';

    const encryptedData = CryptoUtils.aesEncrypt(JSON.stringify({ email, password }), 'mysecurekey1234567890', 'uniqueiv12345678');

    cookieStore.set({
      name: 'encryptedData',
      value: encryptedData,
      httpOnly: true,
      path: '/',
      secure: true,
      maxAge: 60 * 60,
    });

    const EncryptedData = CryptoUtils.aesEncrypt(JSON.stringify({ email, OTPType: 'link' }), 'mysecurekey1234567890', 'uniqueiv12345678');

    const response = await fetch('https://quikdb-core-beta.onrender.com/a/sendOtp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: EncryptedData }),
    });

    const result = await response.json();
    console.log('send-otp-link-result:::', result);

    if (response.ok && result.status === 'success') {
      return new Response(JSON.stringify(result), { status: response.status });
    }
    return new Response(JSON.stringify(result), { status: response.status });
  } catch (error) {
    console.error('Error in /api/sign-in:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
