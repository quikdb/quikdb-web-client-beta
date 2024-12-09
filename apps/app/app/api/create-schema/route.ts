import { database } from '../../store/backend/src/declarations/database';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { schemaName, customFields, userDefinedIndexes } = body;
    console.log({database})

    const response = await database.createSchema(schemaName, customFields, userDefinedIndexes);
    console.log('create-schema-api-response:::', response);

    if ('ok' in response) {
      if (response.ok === true) {
        return new Response(JSON.stringify(response), { status: 200 });
      } else {
        return new Response(JSON.stringify(response), { status: 500 });
      }
    } else if ('err' in response) {
      return new Response(JSON.stringify(response), { status: 500 });
    } else {
      return new Response(JSON.stringify({ error: 'Unexpected response format' }), { status: 500 });
    }
  } catch (error) {
    console.error('Error in /api/sign-in:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
