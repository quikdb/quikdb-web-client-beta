import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory as quikdb_idl } from '../icp-database/declaration/database';

const canisterId = 'bkyz2-fmaaa-aaaaa-qaaaq-cai';

const agent = new HttpAgent({ host: 'http://127.0.0.1:4943' });

const quikDB = Actor.createActor(quikdb_idl, { agent, canisterId });

agent.fetchRootKey();

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const schemaName = url.searchParams.get('schemaName');
  
    if (!schemaName) {
      return new Response(JSON.stringify({ error: 'Missing schemaName parameter' }), { status: 400 });
    }

    const response = await quikDB.getAllRecords(schemaName);
    console.log('get-schema-data::', response)

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error('Error in /api/get-schemas:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
