'use client';
import React, { useState } from 'react';
import { Input, FormHeader } from '@repo/design-system/components/onboarding';
import { Button } from '@repo/design-system/components/ui/button';
import { CryptoUtils } from '@repo/design-system/lib/cryptoUtils';
import axios from 'axios';


const SendOTP: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const data = {
        email,
        OTPType: 'signup',
      };
      const encryptedData = CryptoUtils.aesEncrypt(JSON.stringify(data), 'mysecurekey1234567890', 'uniqueiv12345678');
      const response = await axios.post('https://quikdb-core-beta.onrender.com/a/sendOtp', {
        data: encryptedData,
      });
      if (response.status === 200) {
        setSuccess(true);
        setError('');
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
      <FormHeader title='Send OTP' description={`One-time Password code sent to ${email || 'your email'}.`} showLogo />
      <main className='flex flex-col items-center justify-center my-16 w-full'>
        <div className='flex flex-col w-full md:w-[680px] items-center'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 items-center w-full'>
            <Input type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
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
