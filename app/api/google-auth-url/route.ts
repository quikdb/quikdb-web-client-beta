export async function GET(req: Request) {
  try {
    const response = await fetch('https://quikdb-core-beta.onrender.com/a/get-oauth-url', {
      method: 'GET',
    });
    const result = await response.json();
    console.log('google-auth-url-result:::', result);

    if (response.ok && result.status === 'success') {
      return new Response(JSON.stringify(result), { status: response.status });
    }
    return new Response(JSON.stringify(result), { status: response.status });
  } catch (error) {
    console.error('Error in /api/google-signup:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
