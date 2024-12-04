'use client';
import { ChevronDown, GlobeIcon } from 'lucide-react';
import { Button } from '@repo/design-system/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@repo/design-system/components/ui/dropdown-menu';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import NotifModal from './NotifModal';

// type DashHeaderProps = {
//   userEmail: string;  // Define the type for the email prop
// };{ userEmail }: DashHeaderProps

const DashHeader = () => {
  const { userEmail } = useSelector((state: RootState) => state.auth);

  const firstName = userEmail ? userEmail.split('@')[0] : 'User';

  return (
    <div className='flex items-center justify-between p-6 max-md:p-4 border-b border-b-[#1B1C1F]'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='bg-transparent text-gray-400 border border-gray-600 max-md:text-xs max-md:h-8'>
            <GlobeIcon /> {firstName} Org <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='max-md:translate-x-[-50%] font-medium p-4 max-md:p-2 px-8 max-md:px-5 mt-2 ml-32 bg-[#111015] text-white border border-gray-600 border-b-[#40E39D]'>
          <div className='flex flex-col gap-1 mb-5 max-md:mb-2'>
            <p className='text-gradient text-lg max-md:text-xs'>{firstName}'s Org - 2024-11-02</p>
            <p className='text-sm max-md:text-[10px]'>Lorem ipsum</p>
          </div>
          <Link href='/organizations' className='text-[#8A46FF]/80 text-sm max-md:text-xs'>
            View Organizations
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center gap-3 text-lg max-md:ml-5">
        <div className="flex gap-2">
          <img src="/images/gem.png" alt="gem" className="w-5 object-contain max-md:w-3" />
          <p className='max-md:text-xs'>30</p>
        </div>
        <hr className="border-[#1B1C1F] rotate-90 w-5 max-md:hidden" />
        <div className="flex gap-3 items-center">
          <NotifModal />
          <div className="flex gap-3 max-md:gap-0">
            <img src="/images/user.png" alt="user" className='object-contain' />
            <p className="flex items-center gap-2 text-gray-400 max-md:text-xs">Oluwatimileyin<ChevronDown size={16} /></p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashHeader;
