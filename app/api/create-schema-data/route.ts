// import { HttpAgent, Actor } from '@dfinity/agent';
// import { idlFactory as quikdb_idl } from '../icp-database/declaration/database';
// import { v4 as uuidv4 } from 'uuid';

// const canisterId = 'bkyz2-fmaaa-aaaaa-qaaaq-cai';

// const agent = new HttpAgent({
//   host: process.env.NODE_ENV === 'production' ? 'https://quikdb.com' : 'http://127.0.0.1:4943',
// });

// if (process.env.NODE_ENV !== 'production') {
//   agent.fetchRootKey();
// }

// const quikDB = Actor.createActor(quikdb_idl, { agent, canisterId });


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { schemaName, record } = body;
    console.log('Request body:', body);
    
    // const response = await quikDB.insertData(schemaName, record);

    // return new Response(JSON.stringify({ success: true, data: response }), { status: 200 });
  } catch (error) {
    console.error('Error in /api/create-schema-data', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to insert data' }), { status: 500 });
  }
}
