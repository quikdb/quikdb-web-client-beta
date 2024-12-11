// /api/search-schema-data.ts

import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory as quikdb_idl } from '../icp-database/declaration/database';

const canisterId = 'bkyz2-fmaaa-aaaaa-qaaaq-cai';

const agent = new HttpAgent({ host: 'http://127.0.0.1:4943' });

const quikDB = Actor.createActor(quikdb_idl, { agent, canisterId });

agent.fetchRootKey();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { schemaName, indexes, searchText } = body;

    if (!schemaName || !Array.isArray(indexes)) {
      return new Response(
        JSON.stringify({ error: 'Invalid input: schemaName should be a string and indexes should be an array' }),
        { status: 400 }
      );
    }

    const filters: [string, string][] = indexes.map(index => [index, searchText]);

    const response = await quikDB. searchByMultipleFields(schemaName, filters);
    console.log('searchByMultipleFields response:', response);

    return new Response(JSON.stringify(response), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
