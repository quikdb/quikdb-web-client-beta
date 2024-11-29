'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GlobalSidebar from './components/sidebar';
import DashHeader from './components/DashHeader';
import { parseCookies } from 'nookies';

type LayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: LayoutProps) {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    console.log('Cookies:', cookies);
    const token = cookies.accessToken;

    if (!token) {
      router.push('/sign-in');
    } else {
      setToken(token);
    }
  }, [router]);

  if (token === null) {
    return null;
  }

  return (
    <div className='flex'>
      <GlobalSidebar />
      <div className='flex-grow pl-[18%]'>
        <DashHeader />
        <div className='max-md:mt-5 mb-10 p-10 bg-transparent min-h-screen'>{children}</div>
      </div>
    </div>
  );
}
