import { CryptoUtils } from '@quikdb/design-system/lib/cryptoUtils';
import { cookies } from 'next/headers';

export async function DELETE(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  const body = await req.json();
  const { projectId } = body;

  if (!projectId) {
    return new Response(JSON.stringify({ error: 'Missing projectId parameter' }), { status: 400 });
  }

  const encryptedData = CryptoUtils.aesEncrypt(JSON.stringify({ id: projectId }), 'mysecurekey1234567890', 'uniqueiv12345678');

  try {
    const headers = new Headers();
    if (token) {
      headers.append('Authorization', token);
    }

    const response = await fetch(`https://quikdb-core-beta.onrender.com/v/p/${encryptedData}/token`, {
      method: 'DELETE',
      headers,
    });

    const result = await response.json();
    console.log('delete-project-token-result:::', result);

    if (response.ok && result.status === 'success') {
      return new Response(JSON.stringify(result), { status: response.status });
    }
    return new Response(JSON.stringify(result), { status: response.status });
  } catch (error) {
    console.error('Error in /api/:projects/token', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
