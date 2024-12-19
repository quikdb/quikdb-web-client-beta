import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  try {
    const body = await req.json();
    const { OrderID } = body;

    const headers = new Headers();
    if (token) {
      headers.append('Authorization', token);
    }
    headers.append('Content-Type', 'application/json');

    const response = await fetch(`https://quikdb-core-beta.onrender.com/v/pay/${OrderID}`, {
      method: 'GET',
      headers,
    });

    const result = await response.json();
    console.log('capture-paypal-order-result:::', result);

    if (response.ok && result.status === 'success') {
      return new Response(JSON.stringify(result), { status: response.status });
    }
    return new Response(JSON.stringify(result), { status: response.status });
  } catch (error) {
    console.error('Error in create-paypal-order', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
