'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GlobalSidebar from './components/sidebar';
import DashHeader from './components/DashHeader';
// import { parseCookies } from 'nookies';
import React from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: LayoutProps) {
  // const [token, setToken] = useState<string | null>(null);
  // const [userEmail, setUserEmail] = useState<string | null>(null);
  // const router = useRouter();

  // useEffect(() => {
  //   const cookies = parseCookies();
  //   const token = cookies.accessToken;

  //   if (!token) {
  //     router.push('/sign-in');
  //   } else {
  //     setToken(token);
  //   }

  //   const email = cookies.userEmail || null;
  //   setUserEmail(email);
  // }, [router]);

  // if (token === null || userEmail === null) {
  //   return null; // Prevent rendering until email and token are available
  // }

  return (
    <div className='flex'>
      <GlobalSidebar />
      <div className='flex-grow pl-[18%] max-md:pl-0'>
        <DashHeader />
        <div className='mt-0 mb-10 px-10 py-0 max-md:px-4 bg-transparent min-h-screen'>
          {/* Ensure token and userEmail are passed to children */}
          {/* {React.cloneElement(children as React.ReactElement, { token, userEmail })} */}
          {children}
        </div>
      </div>
    </div>
  );
}
