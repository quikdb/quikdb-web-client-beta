'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@quikdb/design-system/components/ui/button';
import { FormHeader } from '@quikdb/design-system/components/onboarding';
import { useOneTimeLink } from '@/hooks/fetchOneTimeLink';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setAuthState } from '@/app/store';

const OneTimeLink = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const linkId = pathname?.split('/')[2];
  console.log('linkId:', linkId);

  const { data, isLoading, isError } = useOneTimeLink(linkId);

  useEffect(() => {
    if (isLoading) return;

    if (isError) {
      toast.error('Invalid or expired link. Please request a new link.');
      return;
    }

    if (data && data.status === 'success') {
      const userEmail = data.user?.email;
      const accessToken = data.token;

      if (userEmail && accessToken) {
        dispatch(setAuthState({ token: accessToken, userEmail }));
        toast.success('Link verified successfully! Redirecting to overview...');
      }
    }
  }, [data, isLoading, isError, dispatch, router]);

  return (
    <div className='flex justify-center items-center w-full'>
      <div className='flex flex-col w-full max-w-screen-2xl'>
        <FormHeader title='One-Time Link' description='Please wait while we verify your link.' showLogo />

        <main className='flex flex-col items-center justify-center w-full'>
          <div className='flex flex-col w-full md:w-[680px] items-center'>
            {isLoading ? (
              <p>Loading...</p>
            ) : data ? (
              <div className='flex flex-col items-center'>
                <p className='text-green-500 text-lg mt-2'>Your link is valid. Redirecting...</p>
                <Link href='/overview'>
                  <Button className='mt-4'>Go to Overview</Button>
                </Link>
              </div>
            ) : (
              <div className='flex flex-col items-center'>
                <p className='text-red-500 text-lg mt-2'>{isError}</p>
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
