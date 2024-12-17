'use client';
import { useGoogleAuth } from '@/hooks/fetchGoogleAuth';
import { useSearchParams } from 'next/navigation';

const GoogleCallback = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  if (!code) {
    return <main className="min-h-screen px-20 py-7">No code found in URL</main>;
  }

  const { data, isError, isLoading } = useGoogleAuth(code);

  if (isLoading) {
    return <main className="min-h-screen px-20 py-7">Loading...</main>;
  }

  if (isError) {
    return <main className="min-h-screen px-20 py-7">An error occurred. Please try again.</main>;
  }

  return (
    <main className="min-h-screen px-20 py-7">
      <div>{JSON.stringify(data, null, 2)}</div>
    </main>
  );
};

export default GoogleCallback;
