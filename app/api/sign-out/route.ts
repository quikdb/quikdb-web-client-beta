import { cookies } from 'next/headers';

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  try {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    if (token) {
      headers.set('Authorization', token);
    }

    const response = await fetch('https://quikdb-core-beta.onrender.com/a/signout', {
      method: 'GET',
      headers,
    });
    console.log('sign-out-result:::', response);

    cookieStore.delete('accessToken');
    cookieStore.delete('userEmail');
    cookieStore.delete('encryptedData');
    cookieStore.delete('signupData');

    const result = await response.json();

    if (response.ok && result.status === 'success') {
      return new Response(JSON.stringify({ ...result, redirect: '/sign-in' }), { status: response.status });
    }
    return new Response(JSON.stringify(result), { status: response.status });
  } catch (error) {
    console.error('Error in /api/sign-out:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
