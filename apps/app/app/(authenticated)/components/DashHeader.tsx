"use client";
import { ChevronDown, GlobeIcon } from 'lucide-react';
import { Button } from '@repo/design-system/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@repo/design-system/components/ui/dropdown-menu';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

// type DashHeaderProps = {
//   userEmail: string;  // Define the type for the email prop
// };{ userEmail }: DashHeaderProps

const DashHeader = () => {
  const { token, userEmail } = useSelector((state: RootState) => state.auth);

  const firstName = userEmail ? userEmail.split('@')[0] : 'User';

  return (
    <div className='flex justify-between p-6 border-b border-b-[#1B1C1F]'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='bg-transparent text-gray-400 border border-gray-600'>
            <GlobeIcon /> {firstName} Org <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='font-medium p-4 px-8 mt-2 ml-32 bg-[#111015] text-white border border-gray-600 border-b-[#40E39D]'>
          <div className='flex flex-col gap-1 mb-5'>
            <p className='text-gradient text-lg'>{firstName}'s Org - 2024-11-02</p>
            <p className='text-sm'>Lorem ipsum</p>
          </div>
          <Link href='/organizations' className='text-[#8A46FF]/80 text-sm'>
            View Organizations
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className='flex items-center gap-10 text-lg'>
        <div className='flex gap-2'>
          <img src='/images/gem.png' alt='gem' className='w-5' />
          <p>30</p>
        </div>
        <div className='flex gap-3'>
          <img src='/images/user.png' alt='user' />
          <p className='flex items-center gap-2 text-gray-400'>
            {firstName}
            <ChevronDown size={16} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashHeader;
