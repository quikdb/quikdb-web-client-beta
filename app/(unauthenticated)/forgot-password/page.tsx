'use client';

import { Input, FormDivider, PasswordInput, FormHeader } from '@quikdb/design-system/components/onboarding';
import { Button } from '@quikdb/design-system/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/send-otp-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailAddress, password }),
      });

      const result = await response.json();
      const otp = result.data.otp;

      if (response.ok && result.status === 'success') {
        setSuccess(true);
        toast.success(`OTP ${otp} sent successfully`);

        router.push('/verify-otp-password');
      } else {
        setError(result.error || 'Failed to sign up. Please try again.');
        toast.warning(result.message || 'Failed to send OTP');
      }
    } catch (err: any) {
      console.error('Error during sign-up:', err);
      setError('An error occurred during sign-up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col w-full p-10'>
      <FormHeader title='Forgot password' description='Please enter the email assigned to your account for password recovery.' showLogo />
      <main className='flex flex-col items-center justify-center my-16 w-full'>
        <div className='flex flex-col w-full md:w-[680px] items-center'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 items-center w-full'>
            <Input type='email' placeholder='Enter Address' onChange={(e) => setEmailAddress(e.target.value)} value={emailAddress} required />
            <PasswordInput placeholder='Enter Password' required value={password} onChange={(e) => setPassword(e.target.value)} />

            <Button
              type='submit'
              className={`w-full ${
                emailAddress !== '' ? 'bg-white text-[#141414] hover:text-black hover:bg-[#dadada]' : 'bg-[#141414] text-[#A5A5A5]'
              } h-[50px] text-lg rounded-2xl p-6`}
              disabled={!emailAddress}
            >
              {loading ? '...loading' : 'Send Code'}
            </Button>

            <span className='text-[16px] text-gradient cursor-pointer'>Resend code</span>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
