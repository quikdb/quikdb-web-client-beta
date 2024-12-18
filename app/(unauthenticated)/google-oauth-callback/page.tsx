'use client';
import { useDispatch } from 'react-redux';
import { setAuthState } from '@/app/store';
import { useGoogleAuth } from '@/hooks/fetchGoogleAuth';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const GoogleCallback = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [code, setCode] = useState<string | null>(null);
  const dispatch = useDispatch();

  const { data, isError, isLoading } = useGoogleAuth(code || '');

  useEffect(() => {
    const codeParam = searchParams.get('code');

    if (codeParam) {
      setCode(codeParam);
    }

    if (data) {
      const userEmail = data.data.email;
      const accessToken = data.data.accessToken;

      if (userEmail && accessToken) {
        dispatch(setAuthState({ token: accessToken, userEmail }));
      }
      router.push('/overview');
    }
  }, [searchParams, data, router]);

  if (!code) {
    return <main className='min-h-screen px-20 py-7'>No code found in URL</main>;
  }

  if (isLoading) {
    return <main className='min-h-screen px-20 py-7'>Loading...</main>;
  }

  if (isError) {
    return <main className='min-h-screen px-20 py-7'>An error occurred. Please try again.</main>;
  }

  return (
    <main className='min-h-screen px-20 py-7'>
      <div>{JSON.stringify(data, null, 2)}</div>
    </main>
  );
};

export default GoogleCallback;
