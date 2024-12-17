import { cookies } from 'next/headers';
import { CryptoUtils } from '@quikdb/design-system/lib/cryptoUtils';

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const EncryptedData = cookieStore.get('encryptedData')?.value || '';

  if (!EncryptedData) {
    return new Response(JSON.stringify({ error: 'Missing encrypted data in cookies' }), { status: 400 });
  }

  const decryptedData = CryptoUtils.aesDecrypt(EncryptedData, 'mysecurekey1234567890', 'uniqueiv12345678');
  console.log('Decrypted Data:', decryptedData);

  const { email, password } = JSON.parse(decryptedData);

  try {
    const body = await req.json();
    const { otp } = body;

    const encryptedOTPData = CryptoUtils.aesEncrypt(JSON.stringify({ email, OTPType: 'password', otp }), 'mysecurekey1234567890', 'uniqueiv12345678');

    const response = await fetch('https://quikdb-core-beta.onrender.com/a/verifyOtp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: encryptedOTPData }),
    });

    const result = await response.json();
    console.log('verifyOtpresult:', result);

    if (!result.data?.token) {
      return new Response(JSON.stringify({ error: 'Token not received from OTP verification' }), { status: 400 });
    }

    const token = result.data.token;
    console.log('token:', token);

    const data = JSON.stringify({
      password: password,
    });

    const encryptedPasswordData = CryptoUtils.aesEncrypt(data, 'mysecurekey1234567890', 'uniqueiv12345678');

    const responseFP = await fetch('https://quikdb-core-beta.onrender.com/a/forgotPassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authorization: token },
      body: JSON.stringify({ data: encryptedPasswordData }),
    });

    const resultFP = await responseFP.json();
    console.log('forgotPasswordresult:', resultFP);

    if (!responseFP.ok) {
      return new Response(JSON.stringify({ error: 'Failed to update password' }), { status: responseFP.status });
    }

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

  } catch (error) {
    console.error('Error in /api/verify-otp:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
