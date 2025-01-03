'use client';
import { ReactNode } from 'react';
import GlobalSidebar from './components/sidebar';
import DashHeader from './components/DashHeader';
import React from 'react';
import ScrollingAlert from './components/ScrolingAlert';

type LayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: LayoutProps) {
  return (
    <div>
      <ScrollingAlert />
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
    </div>
  );
}
