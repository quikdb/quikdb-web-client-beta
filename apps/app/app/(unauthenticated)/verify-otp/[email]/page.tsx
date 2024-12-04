'use client';
import React, { useState } from 'react';
import { Input, FormHeader } from '@repo/design-system/components/onboarding';
import { Button } from '@repo/design-system/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { CryptoUtils } from '@repo/design-system/lib/cryptoUtils';

const VerifyOTP: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');  // Retrieve email from URL

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      if (!email) {
        setError('Email is missing');
        return;
      }

      const data = {
        email,
        OTPType: 'signup',
        otp,
      };
      const encryptedData = CryptoUtils.aesEncrypt(JSON.stringify(data), 'mysecurekey1234567890', 'uniqueiv12345678');
      
      const response = await axios.post('https://quikdb-core-beta.onrender.com/a/verifyOtp', { data: encryptedData });

      if (response.status === 200) {
        setSuccess(true);
        setError('');
        router.push('/sign-in');  // Redirect to sign-in after successful OTP verification
      } else {
        setError('Failed to verify OTP: ' + response.data.error);
      }
    } catch (err: any) {
      console.error('Error verifying OTP:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col w-full p-10'>
      <FormHeader title='Verify OTP' description={`Enter your OTP sent to ${email || 'your email'}.`} showLogo />
      <main className='flex flex-col items-center justify-center my-16 w-full'>
        <div className='flex flex-col w-full md:w-[680px] items-center'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 items-center w-full'>
            <Input type='text' placeholder='Enter OTP' value={otp} onChange={(e) => setOtp(e.target.value)} required />
            <Button
              type='submit'
              disabled={loading}
              className={`w-full h-[50px] text-lg rounded-2xl p-6 ${loading ? 'bg-gray-500' : 'bg-[#141414]'} text-[#A5A5A5] hover:text-blacko`}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Button>
            {error && <p className='text-red-500'>{error}</p>}
            {success && <p className='text-green-500'>OTP verified successfully!</p>}
          </form>
        </div>
      </main>
    </div>
  );
};

export default VerifyOTP;
