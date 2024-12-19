import { CryptoUtils } from '@quikdb/design-system/lib/cryptoUtils';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const email = cookieStore.get('userEmail')?.value;

  try {
    const body = await req.json();
    const { projectId, databaseVersion } = body;

    const encryptedProjectId = CryptoUtils.aesEncrypt(
      JSON.stringify({ id: projectId }),
      'mysecurekey1234567890',
      'uniqueiv12345678'
    );

    const tokenData = JSON.stringify({
      email,
      databaseVersion,
      duration: 1000, 
    });

    const encryptedTokenData = CryptoUtils.aesEncrypt(
      tokenData,
      'mysecurekey1234567890',
      'uniqueiv12345678'
    );

    const headers = new Headers();
    if (token) {
      headers.append('Authorization', token);
    }
    headers.append('Content-Type', 'application/json');

    const response = await fetch(
      `https://quikdb-core-beta.onrender.com/v/p/${encryptedProjectId}/token`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ data: encryptedTokenData }),
      }
    );

    const result = await response.json();
    console.log('create-project-token-result:::', result);

    if (response.ok && result.status === 'success') {
      return new Response(JSON.stringify(result), { status: response.status });
    }
    return new Response(JSON.stringify(result), { status: response.status });
  } catch (error) {
    console.error('Error in /api/:projects/token', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
