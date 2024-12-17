import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory as quikdb_idl } from '../icp-database/declaration/database';

const canisterId = 'bkyz2-fmaaa-aaaaa-qaaaq-cai';

const agent = new HttpAgent({
  host: process.env.NODE_ENV === 'production' ? 'https://quikdb.com' : 'http://127.0.0.1:4943',
});

if (process.env.NODE_ENV !== 'production') {
  agent.fetchRootKey();
}

const quikDB = Actor.createActor(quikdb_idl, { agent, canisterId });

interface GetSchemaResponse {
  schemaName: string;
  createdAt: bigint;
  fields: { name: string; type: string }[];
  indexes: string[];
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { schemaName } = body;

    const response = (await quikDB.getSchema(schemaName)) as GetSchemaResponse[];


    const serializedResponse = response.map((schema) => ({
      ...schema,
      createdAt: schema.createdAt.toString(),
    }));

    return new Response(JSON.stringify(serializedResponse), { status: 200 });
  } catch (error) {
    console.error('Error in /api/get-schema:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}

