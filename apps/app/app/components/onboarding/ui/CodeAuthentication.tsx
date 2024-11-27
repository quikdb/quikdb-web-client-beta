import { Form, Link } from 'react-router-dom';
import { FormHeader, Input } from '../';
import { Button } from '@/components/ui/button';

interface CodeAuthenticationProps {
  // children?: React.ReactNode;
  email?: string;
}

const CodeAuthentication: React.FC<CodeAuthenticationProps> = ({email}) => {
  return (
    <div className='flex flex-col w-full max-w-screen-2xl'>
      <FormHeader title='Create an account' description={`One-time login code sent to ${email}.`} showLogo />

      <main className='flex flex-col items-center justify-center my-16 w-full'>
        <div className='flex flex-col w-full md:w-[680px] items-center'>
          <Form action="submit" className='flex flex-col gap-y-4 items-center w-full'>
            <Input type='text'
              placeholder='Enter Code'
              required
            />

            <Button type='submit' className='w-full bg-[#141414] h-[50px] text-lg rounded-2xl p-6 text-[#A5A5A5]'>Continue</Button>

            <span className='text-[16px] text-gradient cursor-pointer'>Resend code</span>
          </Form>
        </div>
      </main>
    </div>
  )
}

export default CodeAuthentication
