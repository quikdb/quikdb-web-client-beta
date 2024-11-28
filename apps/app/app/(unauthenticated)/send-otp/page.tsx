'use client';
import React, { useState } from 'react';
import { FormHeader, Input } from '../../components/onboarding';
import { Button } from '@repo/design-system/components/ui/button';
// import { CryptoUtils } from "@/utils";

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;
// const ENCRYPTION_RANDOMIZER = import.meta.env.VITE_ENCRYPTION_RANDOMIZER;

interface SendOTPProps {
  email?: string;
}

const SendOTP: React.FC<SendOTPProps> = ({ email }) => {
  const [userEmail, setUserEmail] = useState(email || ''); // Controlled input for email
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error message
  const [success, setSuccess] = useState(false); // Success state

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const payload = JSON.stringify({
        email: userEmail,
        OTPType: 'signup',
      });

      // const encryptedData = CryptoUtils.aesEncrypt(payload, ENCRYPTION_KEY, ENCRYPTION_RANDOMIZER);

      // const response = await fetch(`${BASE_URL}/a/sendOtp`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ data: encryptedData }),
      // });

      // if (!response.ok) {
      //   throw new Error(`Error: ${response.statusText}`);
      // }

      // const data = await response.json();
      // console.log("OTP sent successfully:", data);
      setSuccess(true);
    } catch (err: any) {
      console.error('Error sending OTP:', err);
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col w-full p-10'>
      <FormHeader title='Send OTP' description={`One-time Password code sent to ${email || 'your email'}.`} showLogo />

      <main className='flex flex-col items-center justify-center my-16 w-full'>
        <div className='flex flex-col w-full md:w-[680px] items-center'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 items-center w-full'>
            <Input type='email' placeholder='Enter Email' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required />

            <Button
              type='submit'
              disabled={loading}
              className={`w-full h-[50px] text-lg rounded-2xl p-6 ${loading ? 'bg-gray-500' : 'bg-[#141414]'} text-[#A5A5A5]`}
            >
              {loading ? 'Sending...' : 'Continue'}
            </Button>

            {error && <p className='text-red-500'>{error}</p>}
            {success && <p className='text-green-500'>OTP sent successfully! Check your inbox.</p>}

            <span className='text-[16px] text-gradient cursor-pointer' onClick={handleSubmit}>
              Resend code
            </span>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SendOTP;
