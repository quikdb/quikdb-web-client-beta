"use client";
import { Button } from '@repo/design-system/components/ui/button';
import { PlusIcon } from 'lucide-react';
import type { ReactElement } from 'react';
import { parseCookies } from 'nookies';



const Overview = () => {
  const cookies = parseCookies();
  const userEmail = cookies.userEmail || 'User';
  const firstName = userEmail.split('@')[0]

  return (
    <div className='mt-10'>
      <p className='text-2xl font-satoshi_medium'>Welcome {firstName} 👋</p>
      <div className='flex flex-col justify-center items-center gap-10 h-[60vh]'>
        <div className='flex flex-col items-center'>
          <img src='/images/empty_box.png' alt='empty_box' />
          <p className='text-sm font-light text-gray-400'>No Project Available . Create a new project to get stated</p>
        </div>
        <Button size='lg' className='font-satoshi_medium bg-gradient px-4 w-fit text-[#0F1407]'>
          <PlusIcon className='text-white border border-dotted rounded-lg' />
          New Project
        </Button>
      </div>
    </div>
  );
};

export default Overview;
