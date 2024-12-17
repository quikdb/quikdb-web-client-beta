'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@quikdb/design-system/components/ui/button';
import { Input, FormDivider, PasswordInput, FormHeader } from '@quikdb/design-system/components/onboarding';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setAuthState } from '@/app/store';
import { toast } from 'sonner';
import axios from 'axios';
import { AuthClient } from '@dfinity/auth-client';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [seeOtherOptions, setSeeOtherOptions] = useState(false);

  const handleGoogleSignUp = async () => {
    try {
      const response = await fetch('api/google-auth-url', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json()
      if (response.ok && result.status === 'success' && result.data.redirectUrl) {
        window.location.href = result.data.redirectUrl;
      } else {
        console.error('Google sign-up failed: ', result.message || 'Unknown error');
        setError(result.message || 'An error occurred while initiating Google sign-up. Please try again.');
      }    } catch (err) {
      console.error('Error during Google sign-up:', err);
      setError('An error occurred while initiating Google sign-up. Please try again.');
    }
  };

  const router = useRouter();
  const dispatch = useDispatch();

  const buttonStyle = 'w-full border-[1px] bg-transparent border-[#1F1F1F] h-[50px] text-base rounded-2xl px-6 text-white hover:text-blacko';
  const buttonTextPrefix = 'Sign In';

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
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

  async function loginWithInternetIdentity() {
    const authClient = await AuthClient.create();

    await authClient.login({
      identityProvider: 'https://identity.ic0.app',
      onSuccess: async () => {
        const identity = authClient.getIdentity();

        const principalId = identity.getPrincipal().toText();

        const response = await fetch('/api/sign-up-ii', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ principalId }),
        });

        if (!response.ok) {
          throw new Error('Failed to authenticate with Internet Identity');
        }

        router.push('/overview');

        console.log('Authenticated Principal:', principalId);
      },
      onError: (err) => {
        console.error('Failed to authenticate with Internet Identity:', err);
      },
    });
  }

  const handleOneTimeLink = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!email) {
      setError('Please enter your email');
      toast.error('Please enter your email');
      return;
    }

    try {
      const response = await fetch('/api/send-otp-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, OTPType: 'link' }),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        const link = result.data.link;

        setSuccess(true);
        toast.success('One time link sent successfully');

        router.push(link);
      } else {
        setError(result.error || 'Failed to send OTP');
        toast.warning(result.message || 'Failed to send OTP');
      }
    } catch (err: any) {
      console.error('Error during OTP link request:', err);
      setError('An error occurred. Please try again.');
      toast.error('An error occurred. Please try again.');
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

              <Link href='/forgot-password' className='text-sm font-light text-right w-full pr-2 text-gradient'>
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
                <Button className={buttonStyle} onClick={loginWithInternetIdentity}>
                  {buttonTextPrefix} with internet identity
                </Button>
                <Button className={buttonStyle} onClick={handleOneTimeLink}>
                  {buttonTextPrefix} with one-time link
                </Button>
              </div>

              {/* Option to see other sign-in methods */}
              {seeOtherOptions ? (
                <div className='flex flex-col justify-between w-full md:flex-row items-center gap-y-4 md:gap-x-4'>
                  <Button className={buttonStyle} onClick={handleGoogleSignUp}>
                    Sign Up with Google
                  </Button>
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
