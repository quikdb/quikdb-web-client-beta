'use client';
import React, { useState } from 'react';
import { Input, FormHeader } from '@repo/design-system/components/onboarding';
import { Button } from '@repo/design-system/components/ui/button';
import axios from 'axios';
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

      // Encrypt the data before sending
      const encryptedData = CryptoUtils.aesEncrypt(
        JSON.stringify(data),
        'mysecurekey1234567890',
        'uniqueiv12345678'
      );

      // Use Axios for the POST request
      const response = await axios.post(
        'https://quikdb-core-beta.onrender.com/a/verifyOtp',
        {
          data: encryptedData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Handle success or failure based on the response
      if (response.status === 200) {
        setSuccess(true); // OTP verified successfully
        setError(''); // Clear any previous errors
      } else {
        setError('Failed to verify OTP: ' + response.data.error);
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
            <Input
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type='text'
              placeholder='Enter Code'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

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
