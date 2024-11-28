'use client';
import React, { useState } from 'react';
import { Input, FormDivider, PasswordInput, FormHeader } from '@repo/design-system/components/onboarding';
import { Button } from '@repo/design-system/components/ui/button';
import { CryptoUtils } from '@repo/design-system/lib/cryptoUtils'; // Adjust the import path as necessary

const VerifyOTP: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(''); // Declare error state
  const [success, setSuccess] = useState(false); // Declare success state

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(''); // Reset error state
    setSuccess(false); // Reset success state

    try {
      const data = {
        email,
        OTPType: 'signup',
        otp,
      };

      const encryptedData = CryptoUtils.aesEncrypt(JSON.stringify(data), 'mysecurekey1234567890', 'uniqueiv12345678');

      const response = await fetch('https://quikdb-core-beta.onrender.com/a/verifyOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: encryptedData }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setSuccess(true); // Set success state
        setError(''); // Clear error
      } else {
        setError('Failed to verify OTP: ' + responseData.error);
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
      <FormHeader title='Verify OTP' description={`Enter your One-time Password code sent to ${email || 'your email'}.`} showLogo />

      <main className='flex flex-col items-center justify-center my-16 w-full'>
        <div className='flex flex-col w-full md:w-[680px] items-center'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 items-center w-full'>
            <Input type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />

            <Input type='text' placeholder='Enter Code' value={otp} onChange={(e) => setOtp(e.target.value)} required />

            <Button
              type='submit'
              disabled={loading}
              className={`w-full h-[50px] text-lg rounded-2xl p-6 ${loading ? 'bg-gray-500' : 'bg-[#141414]'} text-[#A5A5A5]`}
            >
              {loading ? 'Sending...' : 'Continue'}
            </Button>

            {error && <p className='text-red-500'>{error}</p>}
            {success && <p className='text-green-500'>OTP verified successfully! Check your inbox.</p>}

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
