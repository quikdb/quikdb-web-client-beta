'use client';
import { ChevronDown, GlobeIcon, LogOutIcon } from 'lucide-react';
import { Button } from '@quikdb/design-system/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@quikdb/design-system/components/ui/dropdown-menu';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import NotifModal from './NotifModal';
import MobileSidebar from './mobile-sidebar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ModeToggle } from '@quikdb/design-system/components/mode-toggle';

// type DashHeaderProps = {
//   userEmail: string;  // Define the type for the email prop
// };{ userEmail }: DashHeaderProps

const DashHeader = () => {
  const { userEmail } = useSelector((state: RootState) => state.auth);
  const [firstName, setFirstName] = useState('');
  useEffect(() => {
    // Ensure the user email is available only on the client
    if (userEmail) {
      setFirstName(userEmail.split('@')[0]);
    }
  }, [userEmail]);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignout = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/sign-out', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setSuccess(true);
        setError('');
        router.push('/sign-in');
      } else {
        setError(result.error || 'Failed to sign out.');
      }
    } catch (err: any) {
      console.error('Error during sign-out:', err);
      setError('An error occurred during sign-out. Please try again.');
    } finally {
      setLoading(false);
      router.push('/sign-in');
    }
  };


  return (
    <div className='flex items-center justify-between p-6 max-md:p-4 border-b border-b-[#1B1C1F]'>
      <MobileSidebar />

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

      <div className='flex items-center gap-3 text-lg max-md:ml-5'>
        <div className='flex gap-2'>
          <img src='/images/gem.png' alt='gem' className='w-5 object-contain max-md:w-3' />
          <p className='max-md:text-xs'>30</p>
        </div>
        <hr className='border-[#1B1C1F] rotate-90 w-5 max-md:hidden' />
        <div className='flex gap-3 items-center'>
          <NotifModal />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='flex gap-3 max-md:gap-0 cursor-pointer'>
                <img src='/images/user.png' alt='user' className='object-contain' />
                <p className='flex items-center gap-2 text-gray-400 max-md:text-xs'>
                  {firstName} <ChevronDown size={16} />
                </p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='flex flex-col gap-1 text-sm max-md:text-xs lg:font-medium mt-2 ml-32 bg-[#111015] text-white rounded-md border border-none cursor-pointer'>
              <div className='px-10 max-md:px-6 py-2 hover:bg-gray-500 cursor-pointer rounded-t-md'>Profile</div>
              <div className='px-10 max-md:px-6 py-2 hover:bg-gray-500 cursor-pointer'>Organization</div>
              <div
                className='flex gap-2 items-center px-10 max-md:px-6 py-2 hover:bg-gray-500 cursor-pointer rounded-b-md'
                onClick={handleSignout}
              >
                <LogOutIcon size={16} />
                Logout
              </div>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ModeToggle/>
      </div>
    </div>
  );
};

export default DashHeader;
