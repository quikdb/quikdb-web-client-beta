import { createMetadata } from '@repo/design-system/lib/metadata';
import type { Metadata } from 'next';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import { Input, FormDivider, PasswordInput, FormHeader } from '../../../components/onboarding';

const title = 'Create an account';
const description = 'Enter your details to get started.';

export const metadata: Metadata = createMetadata({ title, description });

const SignUpPage = () => {
  const [seeOtherOptions, setSeeOtherOptions] = useState(false);

  const buttonStyle = 'w-full border-[1px] bg-transparent border-[#1F1F1F] h-[50px] text-base rounded-2xl px-6 text-white';

  const buttonTextPrefix = 'Sign Up'; // Static since this is the signup page

  return (
    <div className='flex justify-center items-center w-full'>
      <div className='flex flex-col w-full max-w-screen-2xl'>
        <FormHeader title={title} description='Enter your email to sign up for this app' showLogo />

        <main className='flex flex-col items-center justify-center w-full'>
          <div className='flex flex-col w-full md:w-[680px] items-center'>
            <form className='flex flex-col gap-y-4 items-center w-full'>
              <Input type='email' placeholder='Email Address' required />
              <PasswordInput placeholder='Enter Password' required />

              <Button type='submit' className='w-full bg-[#141414] h-[50px] text-lg rounded-2xl p-6 text-[#A5A5A5]'>
                Continue
              </Button>
            </form>

            <FormDivider />

            <section className='flex flex-col items-center my-6 gap-y-4 w-full'>
              <div className='flex flex-col justify-between w-full md:flex-row items-center gap-y-4 md:gap-x-4'>
                <Button className={buttonStyle}>Sign Up with internet identity</Button>
                <Button className={buttonStyle}>Sign Up with one-time link</Button>
              </div>

              {seeOtherOptions ? (
                <div className='flex flex-col justify-between w-full md:flex-row items-center gap-y-4 md:gap-x-4'>
                  <Button className={buttonStyle}>Sign Up with Google</Button>
                  <Button className={buttonStyle}>Sign Up with Github</Button>
                </div>
              ) : (
                <Button className={buttonStyle} onClick={() => setSeeOtherOptions(!seeOtherOptions)}>
                  See other options
                </Button>
              )}
            </section>

            <section className='flex flex-col items-center gap-y-6'>
              <p className='text-sm font-light text-[#B3B4B3] text-center'>
                By clicking continue, you agree to our{' '}
                <Link href='/terms' className='underline'>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href='/privacy' className='underline'>
                  Privacy Policy
                </Link>
              </p>

              <p className='text-lg font-light text-[#B3B4B3]'>
                Already have an account?{' '}
                <Link href='/login' className='text-gradient'>
                  Log in
                </Link>
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignUpPage;
