import { cookies } from 'next/headers';
import { CryptoUtils } from '@quikdb/design-system/lib/cryptoUtils';

export async function POST(req: Request) {

  try {
    const body = await req.json();
    const { principalId, encryptedPassword, token } = body;
    console.log('sign-in-cli-body:', body);


    if (!principalId) {
      return new Response(JSON.stringify({ error: 'Missing principalId' }), { status: 400 });
    }

    const identity = JSON.stringify({ principalId: principalId, encryptedPassword: encryptedPassword });
    const encryptedData = CryptoUtils.aesEncrypt(identity, 'mysecurekey1234567890', 'uniqueiv12345678');

    const data = {
      identity: encryptedData,
      username: 'PrincipalID',
      projectTokenRef: token,
    };

    const response = await fetch('https://quikdb-core-beta.onrender.com/a/signinWithCli', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log('sign-in-with-cli-result:', result);

    return new Response(JSON.stringify(result), { status: response.status });
  } catch (error) {
    console.error('Error in /api/sign-up-ii:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
