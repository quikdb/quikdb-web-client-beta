'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@repo/design-system/components/ui/button';
import { Input, FormDivider, PasswordInput, FormHeader } from '@repo/design-system/components/onboarding';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setAuthState } from '@/app/store';
import { toast } from 'sonner'; 
import { useDatabase } from '@/hooks';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { result: resultIcp, isLoading, isError } = useDatabase();

  const router = useRouter();
  const dispatch = useDispatch();

  const buttonStyle = 'w-full border-[1px] bg-transparent border-[#1F1F1F] h-[50px] text-base rounded-2xl px-6 text-white hover:text-blacko';
  const buttonTextPrefix = 'Sign In';

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {

      console.log({ resultIcp });
      const response = await fetch('/api/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        const { accessToken, user } = result.data;
        toast.success('Signed in successfully');
        dispatch(setAuthState({ token: accessToken, userEmail: user.email }));

        router.push(result.redirect);
      } else {
        setError(result.error || 'Failed to sign in.');
        toast.warning(result.message || 'Failed to sign in.');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setError('An unexpected error occurred. Please try again.');
      toast.error('An unexpected error occurred. Please try again.');
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
              <Input type='email' placeholder='Email Address' required value={email} onChange={(e) => setEmail(e.target.value)} />

              <PasswordInput placeholder='Enter Password' required value={password} onChange={(e) => setPassword(e.target.value)} />

              <Link href='/forgot_password' className='text-sm font-light text-right w-full pr-2 text-gradient'>
                Forgot Password?
              </Link>

              <Button
                type='submit'
                className='w-full bg-[#141414] h-[50px] text-lg rounded-2xl p-6 text-[#A5A5A5] hover:text-blacko'
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

              {/* Option to see other sign-in methods */}
              <Button className={buttonStyle} onClick={() => setSuccess(!success)}>
                See other options
              </Button>
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
                <Link href='/sign-up' className='text-gradient hover:text-white font-medium'>
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
