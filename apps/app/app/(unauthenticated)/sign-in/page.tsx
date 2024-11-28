'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@repo/design-system/components/ui/button';
import { Input, FormDivider, PasswordInput, FormHeader } from '@repo/design-system/components/onboarding';
import { useRouter } from 'next/navigation'; // For redirecting after successful sign-in
import axios from 'axios'; // Import Axios

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [seeOtherOptions, setSeeOtherOptions] = useState(false);

  const router = useRouter(); // Used to redirect after successful login

  const buttonStyle =
    'w-full border-[1px] bg-transparent border-[#1F1F1F] h-[50px] text-base rounded-2xl px-6 text-white';
  const buttonTextPrefix = 'Sign In';

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      // Using Axios for the POST request
      const response = await axios.post('https://quikdb-core-beta.onrender.com/a/signinWithEP', {
        email,
        password,
      });

      if (response.status === 200) {
        // On success, redirect the user or handle success logic
        router.push('/dashboard'); // or wherever the user should go
      } else {
        // On failure, show the error message
        setError(response.data.message || 'An error occurred during sign in');
      }
    } catch (error) {
      // Handle network or other errors
      setError('Failed to connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center w-full'>
      <div className='flex flex-col w-full max-w-screen-2xl'>
        <FormHeader title='Welcome back' description='Enter your email to sign in to this app' showLogo />

        <main className='flex flex-col items-center justify-center w-full'>
          <div className='flex flex-col w-full md:w-[680px] items-center'>
            <form onSubmit={handleSignIn} className='flex flex-col gap-y-4 items-center w-full'>
              <Input
                type='email'
                placeholder='Email Address'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <PasswordInput
                placeholder='Enter Password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Link href='/forgot_password' className='text-sm font-light text-right w-full pr-2 text-gradient'>
                Forgot Password?
              </Link>

              <Button
                type='submit'
                className='w-full bg-[#141414] h-[50px] text-lg rounded-2xl p-6 text-[#A5A5A5]'
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Continue'}
              </Button>

              {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
            </form>

            <FormDivider />

            <section className='flex flex-col items-center my-6 gap-y-4 w-full'>
              <div className='flex flex-col justify-between w-full md:flex-row items-center gap-y-4 md:gap-x-4'>
                <Button className={buttonStyle}>{buttonTextPrefix} with internet identity</Button>
                <Button className={buttonStyle}>{buttonTextPrefix} with one-time link</Button>
              </div>

              {seeOtherOptions ? (
                <div className='flex flex-col justify-between w-full md:flex-row items-center gap-y-4 md:gap-x-4'>
                  <Button className={buttonStyle}>{buttonTextPrefix} with Google</Button>
                  <Button className={buttonStyle}>{buttonTextPrefix} with Github</Button>
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
                Don't have an account?{' '}
                <Link href='/sign-up' className='text-gradient'>
                  Sign up
                </Link>
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignInPage;
