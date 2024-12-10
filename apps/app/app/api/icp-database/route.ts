import { HttpAgent, Actor } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { idlFactory as quikdb_idl } from './declarations/icp';

const canisterId = (process.env.CANISTER_ID_ICP as string) || 'bd3sg-teaaa-aaaaa-qaaba-cai';

const agent = new HttpAgent({ host: 'http://127.0.0.1:4943' });

const quikDB = Actor.createActor(quikdb_idl, { agent, canisterId });

// if (process.env.NODE_ENV !== 'production') {
//   agent.fetchRootKey(); // Fetch root key in non-production environments for local testing
// }

agent.fetchRootKey(); // Fetch root key in non-production environments for local testing


export async function GET(req: Request) {

  try {
    console.log({ quikDB });
    const createdByPrincipal = Principal.fromText('w7x7r-cok77-xa');
    const result = await quikDB.createProject(name, 'test', createdByPrincipal.toText());
    console.log('Project created:', result);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error('Error in /api/sign-in:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
