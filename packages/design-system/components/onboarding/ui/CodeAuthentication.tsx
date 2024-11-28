import Link from 'next/link'; 
import { FormHeader, Input } from '../';
import { Button } from '../../ui/button';

interface CodeAuthenticationProps {
  email?: string;
}

const CodeAuthentication: React.FC<CodeAuthenticationProps> = ({ email }) => {
  return (
    <div className='flex flex-col w-full max-w-screen-2xl'>
      <FormHeader title='Create an account' description={`One-time login code sent to ${email}.`} showLogo />

      <main className='flex flex-col items-center justify-center my-16 w-full'>
        <div className='flex flex-col w-full md:w-[680px] items-center'>
          <form method='post' className='flex flex-col gap-y-4 items-center w-full'>
            <Input type='text' placeholder='Enter Code' required />

            <Button type='submit' className='w-full bg-[#141414] h-[50px] text-lg rounded-2xl p-6 text-[#A5A5A5]'>
              Continue
            </Button>

            <Link href='#' className='text-[16px] text-gradient cursor-pointer'>
              Resend code
            </Link>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CodeAuthentication;
