import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory as quikdb_idl } from '../icp-database/declaration/database';
import { Database } from '@/app/(authenticated)/components/database-table';

const canisterId = 'bkyz2-fmaaa-aaaaa-qaaaq-cai';

const agent = new HttpAgent({ host: 'http://127.0.0.1:4943' });

const quikDB = Actor.createActor(quikdb_idl, { agent, canisterId });

agent.fetchRootKey();

type DatabaseResponse = {
  ok: Database[];
  error?: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { schemaName } = body;

    const response = (await quikDB.getAllRecords(schemaName)) as DatabaseResponse;
    console.log('get-schema-data', response);
    
    if (response.ok) {
      response.ok.forEach((record) => {
        console.log('Fields:', record.fields);
      });
    }
    return new Response(JSON.stringify(response.ok), { status: 200 });
  } catch (error) {
    console.error('Error in /api/get-schema-data:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
