'use client';

import React, { useState } from 'react';
import { Input, FormHeader } from '@quikdb/design-system/components/onboarding';
import { Button } from '@quikdb/design-system/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'; 

const VerifyOTP: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setSuccess(true);
        toast.success('OTP verified successfully');
        const response = await fetch('/api/sign-up', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();

        if (response.ok && result.status === 'success') {
          toast.success('Account created successfully');
          router.push('/sign-in');
        } else {
          setError(result.error || 'Failed to sign up.');
          toast.error(result.message || 'Failed to sign up.');
        }
      } else {
        setError(result.error || 'Failed to verify OTP.');
        toast.error(result.message || 'Failed to verify OTP.');
      }
    } catch (err: any) {
      console.error('Error verifying OTP:', err);
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col w-full p-10'>
      <FormHeader title='Verify OTP' description={`Enter your One-time Password code sent to ${email || 'your email'}.`} showLogo />
      <main className='flex flex-col items-center justify-center my-16 w-full'>
        <div className='flex flex-col w-full md:w-[680px] items-center'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 items-center w-full'>
            {/* <Input type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} required /> */}
            <Input type='text' placeholder='Enter Code' value={otp} onChange={(e) => setOtp(e.target.value)} required />
            <Button
              type='submit'
              disabled={loading}
              className={`w-full h-[50px] text-lg rounded-2xl p-6 ${loading ? 'bg-gray-500' : 'bg-[#141414]'} text-[#A5A5A5]`}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Button>
            {error && <p className='text-red-500'>{error}</p>}
            {success && <p className='text-green-500'>OTP verified successfully!</p>}
            <span className='text-[16px] text-gradient cursor-pointer' onClick={handleSubmit}>
              Resend code
            </span>
          </form>
        </div>
      </main>
    </div>
  );
};

export default VerifyOTP;
