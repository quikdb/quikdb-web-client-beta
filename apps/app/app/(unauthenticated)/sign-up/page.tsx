'use client'; // Client component

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@repo/design-system/components/ui/button';
import { Input, FormDivider, PasswordInput, FormHeader } from '@repo/design-system/components/onboarding';
import axios from 'axios';
import { CryptoUtils } from '@repo/design-system/lib/cryptoUtils';

const SignUpPage = () => {
  const [seeOtherOptions, setSeeOtherOptions] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const buttonStyle = 'w-full border-[1px] bg-transparent border-[#1F1F1F] h-[50px] text-base rounded-2xl px-6 text-white';
  const buttonTextPrefix = 'Sign Up';

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const data = { email, password };
      const encryptedData = CryptoUtils.aesEncrypt(JSON.stringify(data), 'mysecurekey1234567890', 'uniqueiv12345678');
      const response = await axios.post(
        'https://quikdb-core-beta.onrender.com/a/signupWithEP',
        { data: encryptedData },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 200) {
        setSuccess(true);
        setError('');
      } else {
        setError('Failed to create user: ' + response.data.error);
      }
    } catch (err: any) {
      console.error('Error during sign-up:', err);
      setError('An error occurred during sign-up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center w-full'>
      <div className='flex flex-col w-full max-w-screen-2xl'>
        <FormHeader title='Create an account' description='Enter your email to sign up for this app' showLogo />
        <main className='flex flex-col items-center justify-center w-full'>
          <div className='flex flex-col w-full md:w-[680px] items-center'>
            <form onSubmit={handleSignUp} className='flex flex-col gap-y-4 items-center w-full'>
              <Input type='email' placeholder='Email Address' required value={email} onChange={(e) => setEmail(e.target.value)} />
              <PasswordInput placeholder='Enter Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button type='submit' disabled={loading} className='w-full bg-[#141414] h-[50px] text-lg rounded-2xl p-6 text-[#A5A5A5]'>
                {loading ? 'Signing up...' : 'Continue'}
              </Button>
            </form>
            {error && <p className='text-red-500'>{error}</p>}
            {success && <p className='text-green-500'>Signup successful! Please check your email for OTP.</p>}
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
