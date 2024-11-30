"use client";
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GlobalSidebar from './components/sidebar';
import DashHeader from './components/DashHeader';
import { parseCookies } from 'nookies';
import React from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: LayoutProps) {
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.accessToken;

    if (!token) {
      router.push('/sign-in');
    } else {
      setToken(token);
    }

    const email = cookies.userEmail || null;
    setUserEmail(email);
  }, [router]);

  if (token === null || userEmail === null) {
    return null; // Prevent rendering until email and token are available
  }

  return (
    <div className='flex'>
      <GlobalSidebar token={token} />
      <div className='flex-grow pl-[18%]'>
        <DashHeader userEmail={userEmail} />
        <div className='max-md:mt-5 mb-10 p-10 bg-transparent min-h-screen'>
          {/* Ensure token and userEmail are passed to children */}
          {React.cloneElement(children as React.ReactElement, { token, userEmail })}
        </div>
      </div>
    </div>
  );
}
