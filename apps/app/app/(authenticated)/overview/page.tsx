'use client';
import { Card } from '@repo/design-system/components/ui/card';
import { TrendingUp } from 'lucide-react';
import Link from 'next/link';
import ListProject from '../components/ListProjectForm';
import { useProjects } from '@/hooks/fetchProjects';

const Overview = () => {
  const { total } = useProjects();

  return (
    <div className='mt-10'>
      <div className='flex max-md:flex-col max-md:gap-3 justify-between'>
        <div className='flex flex-col gap-1'>
          <p className='font-medium text-3xl max-md:text-2xl'>Overview</p>
          <p className='font-light text-base text-gray-400 max-md:text-sm'>Real-time overview of your listed projects</p>
        </div>
        <ListProject />
      </div>

      <Card className='mt-7 p-5 bg-blackoff border-none flex flex-col gap-7'>
        <div className='flex max-md:flex-wrap justify-between max-md:gap-y-3'>
          <Card className='bg-transparent text-white border-[#242527] p-4 lg:w-[32%] w-full hover:bg-blacko'>
            <Link href='/projects'>
              <p className='text-lg max-md:text-base'>Total projects</p>
              <div className='mt-7 max-md:mt-4'>
                <p className='text-3xl max-md:text-2xl font-medium'>{total} projects</p> {/* Display total number of projects */}
                <div className='flex gap-3 text-xs mt-2'>
                  <p className='flex items-center gap-1 text-green-400'>
                    10% <TrendingUp size={16} />
                  </p>
                  <p className='text-gray-400'>+2 this week</p>
                </div>
              </div>
            </Link>
          </Card>

          <Card className='bg-transparent text-white border-[#242527] p-4 lg:w-[32%] w-full'>
            <p className='text-lg max-md:text-base'>Total Users</p>
            <div className='mt-7 max-md:mt-4'>
              <p className='text-3xl max-md:text-2xl font-medium'>5 users</p>
              <div className='flex gap-3 text-xs mt-2'>
                <p className='flex items-center gap-1 text-green-400'>
                  10% <TrendingUp size={16} />
                </p>
                <p className='text-gray-400'>+2 this week</p>
              </div>
            </div>
          </Card>
          <Card className='bg-transparent text-white border-[#242527] p-4 lg:w-[32%] w-full'>
            <p className='text-lg max-md:text-base'>Total Data Groups</p>
            <div className='mt-7 max-md:mt-4'>
              <p className='text-3xl max-md:text-2xl font-medium'>5 data groups</p>
              <div className='flex gap-3 text-xs mt-2'>
                <p className='flex items-center gap-1 text-green-400'>
                  10% <TrendingUp size={16} />
                </p>
                <p className='text-gray-400'>+2 this week</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className='bg-transparent text-white border-[#242527] p-4'>
          <div className='flex justify-between'>
            <p className='text-lg'>Database Size</p>
            <p className='font-light'>Increase disk size</p>
          </div>
          <div className='mt-7 flex justify-between'>
            <div className='flex flex-col gap-3 font-medium flex-1'>
              <p className=''>Total Size</p>
              <p className=''>1.00GB</p>
            </div>
            <div className='flex flex-col gap-3 font-medium border-x-2 border-x-[#343434] flex-1 text-center'>
              <p className=''>Total Size</p>
              <p className=''>1.00GB</p>
            </div>
            <div className='flex flex-col gap-3 font-medium flex-1 text-right'>
              <p className=''>Total Size</p>
              <p className=''>1.00GB</p>
            </div>
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default Overview;
