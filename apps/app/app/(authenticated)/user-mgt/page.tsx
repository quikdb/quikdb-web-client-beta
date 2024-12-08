'use client';
import { Button } from '@repo/design-system/components/ui/button';
import { OrgUsersTable } from '../components/orguser-table';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

const UserMgt = () => {
  return (
    <div className='mt-10 max-md:mt-5'>
      <div className='flex max-md:flex-col max-md:gap-3 justify-between'>
        <div className='flex flex-col gap-1'>
          <p className='font-medium text-3xl max-md:text-2xl'>Organization Users</p>
          <p className='font-light text-base text-gray-400 max-md:text-sm'>Real-time overview of your listed projects</p>
        </div>
        <Link href='/user-invite'>
          <Button size='lg' className='font-medium bg-gradient max-md:scale-90 px-4 w-fit text-[#0F1407]'>
            <PlusIcon className='text-white border border-dotted rounded-lg' />
            Invite People
          </Button>
        </Link>
      </div>
      <div>
        <OrgUsersTable />
      </div>
    </div>
  );
};

export default UserMgt;
