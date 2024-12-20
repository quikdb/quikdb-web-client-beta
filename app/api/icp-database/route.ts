// import { HttpAgent, Actor } from '@dfinity/agent';
// import { Principal } from '@dfinity/principal';
// import { idlFactory as quikdb_idl } from './declarations/icp';

// const canisterId = (process.env.CANISTER_ID_ICP as string) || 'bd3sg-teaaa-aaaaa-qaaba-cai';

// const agent = new HttpAgent({
//   host: process.env.NODE_ENV === 'production' ? 'https://quikdb.com' : 'http://127.0.0.1:4943',
// });

// if (process.env.NODE_ENV !== 'production') {
//   agent.fetchRootKey();
// }

// const quikDB = Actor.createActor(quikdb_idl, { agent, canisterId });


export async function GET(req: Request) {

  try {
    // const createdByPrincipal = Principal.fromText('w7x7r-cok77-xa');
    // const result = await quikDB.createProject(name, 'test', createdByPrincipal.toText());
    // return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error('Error in /api/icp-database:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
