export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  try {
    const response = await fetch(`https://quikdb-core-beta.onrender.com/a/google-oauth-callback?code=${code}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();
    console.log('google-callback-result:::', result);

    if (response.ok && result.status === 'success') {
      return new Response(JSON.stringify(result), { status: response.status });
    }
    return new Response(JSON.stringify(result), { status: response.status });
  } catch (error) {
    console.error('Error in /api/:projects/token', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
