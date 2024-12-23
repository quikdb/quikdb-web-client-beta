import { cookies } from 'next/headers';
import { CryptoUtils } from '@quikdb/design-system/lib/cryptoUtils';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { principalId, encryptedPassword } = body;

    if (!principalId) {
      return new Response(JSON.stringify({ error: 'Missing principalId' }), { status: 400 });
    }

    const identity = JSON.stringify({ principalId: principalId, encryptedPassword: encryptedPassword });
    const encryptedData = CryptoUtils.aesEncrypt(identity, 'mysecurekey1234567890', 'uniqueiv12345678');
    console.log('Encrypted Data:', encryptedData);

    return new Response(JSON.stringify(encryptedData), { status: 200 });
  } catch (error) {
    console.error('Error in /api/sign-up-ii:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
