'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@quikdb/design-system/components/ui/button';
import { FormHeader } from '@quikdb/design-system/components/onboarding';

const OneTimeLink = () => {
  const [loading, setLoading] = useState(true);
  const [validLink, setValidLink] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // useEffect(() => {
  //   // Simulate a check for the link (e.g., verify it via an API or check the URL)
  //   const linkValid = true; // Replace this with real validation logic if necessary

  //   if (linkValid) {
  //     setValidLink(true);
  //     toast.success('Link is valid. Proceeding with the next steps...');
  //     setLoading(false);
  //     // Optionally redirect after a delay
  //     setTimeout(() => {
  //       router.push('/reset-password'); // Redirect to password reset page
  //     }, 3000); // Redirect after 3 seconds (for example)
  //   } else {
  //     setValidLink(false);
  //     setError('Invalid or expired link.');
  //     setLoading(false);
  //   }
  // }, []);

  return (
    <div className='flex justify-center items-center w-full'>
      <div className='flex flex-col w-full max-w-screen-2xl'>
        <FormHeader title='One-Time Link' description='Please wait while we verify your link.' showLogo />

        <main className='flex flex-col items-center justify-center w-full'>
          <div className='flex flex-col w-full md:w-[680px] items-center'>
            {loading ? (
              <p>Loading...</p>
            ) : validLink ? (
              <div className='flex flex-col items-center'>
                <p className='text-green-500 text-lg mt-2'>Your link is valid. Redirecting...</p>
                <Button className='mt-4' onClick={() => router.push('/reset-password')}>
                  Proceed to Reset Password
                </Button>
              </div>
            ) : (
              <div className='flex flex-col items-center'>
                <p className='text-red-500 text-lg mt-2'>{error}</p>
                <Button className='mt-4' onClick={() => router.push('/resend-link')}>
                  Request New Link
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default OneTimeLink;
