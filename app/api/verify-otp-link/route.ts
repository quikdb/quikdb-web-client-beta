import { cookies } from 'next/headers';
import { CryptoUtils } from '@quikdb/design-system/lib/cryptoUtils';

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const EncryptedData = cookieStore.get('encryptedData')?.value || '';

  const decryptedData = CryptoUtils.aesDecrypt(EncryptedData, 'mysecurekey1234567890', 'uniqueiv12345678');
  const { email, password } = JSON.parse(decryptedData);

  try {
    const body = await req.json();
    const { otp } = body;

    const encryptedOTPData = CryptoUtils.aesEncrypt(
      JSON.stringify({ email, OTPType: 'link', otp }),
      'mysecurekey1234567890',
      'uniqueiv12345678'
    );

    const response = await fetch('https://quikdb-core-beta.onrender.com/a/verifyOtp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: encryptedOTPData }),
    });

    const result = await response.json();

    if (response.ok && result.status === 'success') {
      cookieStore.set({
        name: 'signupData',
        value: CryptoUtils.aesEncrypt(JSON.stringify({ email, password }), 'mysecurekey1234567890', 'uniqueiv12345678'),
        httpOnly: true,
        path: '/',
        secure: true,
        maxAge: 60 * 10, // Cookie expires in 10 minutes
      });

      cookieStore.delete('encryptedData');

      return new Response(JSON.stringify(result), { status: 200 });
    }

    return new Response(JSON.stringify(result), { status: response.status });
  } catch (error) {
    console.error('Error in /api/verify-otp-link:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
