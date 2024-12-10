import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory as quikdb_idl } from '../icp-database/declaration/database';

const canisterId = 'bkyz2-fmaaa-aaaaa-qaaaq-cai';

const agent = new HttpAgent({ host: 'http://127.0.0.1:4943' });

const quikDB = Actor.createActor(quikdb_idl, { agent, canisterId });

agent.fetchRootKey();

interface GetSchemaResponse {
  ok: boolean;
  data?: any; 
}

export async function GET(req: Request) {
  try {
    const body = await req.json();
    const { schemaName } = body;

    const response = (await quikDB.getSchema(schemaName)) as GetSchemaResponse;

    if (response.ok) {
      return new Response(JSON.stringify(response), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
  } catch (error) {
    console.error('Error in /api/get-schema:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
