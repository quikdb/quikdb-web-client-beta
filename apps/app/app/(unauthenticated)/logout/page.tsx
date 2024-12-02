import { Button } from '@repo/design-system/components/ui/button';
import Link from 'next/link';

const Onboarding = () => {
  return (
    <main className='min-h-screen px-20 py-7'>
      <header>
        <p className='text-gradient font-medium text-3xl'>quikdb</p>
      </header>
      <div className='flex flex-col mt-20 gap-7'>
        <Link href='/sign-up' className='container'>
          <Button className='bg-gradient'>Go to Signup</Button>
        </Link>
        <Link href='/sign-in' className='container'>
          <Button className='bg-gradient'>Go to Login</Button>
        </Link>
        <Link href='/organizations' className='container'>
          <Button className='bg-gradient'>Go to Organizations</Button>
        </Link>
        <Link href='/' className='container'>
          <Button className='bg-gradient'>Go to Dashboard</Button>
        </Link>
      </div>
    </main>
  );
};

export default Onboarding;
