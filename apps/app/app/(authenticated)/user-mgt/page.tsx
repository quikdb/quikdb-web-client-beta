'use client';
import { Button } from '@repo/design-system/components/ui/button';
import { OrgUsersTable } from '../components/orguser-table';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

const UserMgt = () => {
  return (
    <div className='mt-10'>
      <div className='flex justify-between'>
        <div className='flex flex-col gap-1'>
          <p className='font-medium text-3xl'>Organization Users</p>
          <p className='font-light text-base text-gray-400'>Real-time overview of your listed projects</p>
        </div>
        <Link href='/dashboard/user-invite'>
          <Button size='lg' className='font-medium bg-gradient px-4 w-fit text-[#0F1407]'>
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
