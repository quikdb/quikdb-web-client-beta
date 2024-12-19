import { cookies } from 'next/headers';

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  try {
    const headers = new Headers();
    if (token) {
      headers.append('Authorization', token);
    }
    const response = await fetch('https://quikdb-core-beta.onrender.com/v/p', {
      headers,
    });
    const result = await response.json();
    console.log('get-projects-result:::', result);

    if (response.ok && result.status === 'success') {
      return new Response(JSON.stringify(result), { status: response.status });
    }
    return new Response(JSON.stringify(result), { status: response.status });
  } catch (error) {
    console.error('Error in /api/projects:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
