export async function POST(req: Request) {

  try {
    const body = await req.json();
    const { token, password } = body;

    const response = await fetch('https://quikdb-core-beta.onrender.com/a/forgotPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({ password: password }),
    });

    const result = await response.json();
    console.log('send otp result', result);

    if (response.ok && result.status === 'success') {
      return new Response(JSON.stringify(result), { status: response.status });
    }
    return new Response(JSON.stringify(result), { status: response.status });
  } catch (error) {
    console.error('Error in /api/sign-in:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
