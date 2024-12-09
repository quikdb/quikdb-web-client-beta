import { cookies } from 'next/headers';

// function clearAllCookies() {
//   const cookies = document.cookie.split(';');

//   for (let cookie of cookies) {
//     let cookieName = cookie.split('=')[0].trim();

//     document.cookie = `${cookieName}=; Max-Age=0; path=/; SameSite=Strict;`;
//   }
//   localStorage.clear();
//   sessionStorage.clear();
// }

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

    cookieStore.delete('accessToken');
    cookieStore.delete('userEmail');

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
