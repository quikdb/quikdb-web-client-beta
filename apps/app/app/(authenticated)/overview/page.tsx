'use client';
import { useState, useEffect } from 'react';
import { Button } from '@repo/design-system/components/ui/button';
import { Card } from '@repo/design-system/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@repo/design-system/components/ui/select';
import { Calendar, Clock4, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const Overview = () => {
  const [projects, setProjects] = useState<any[]>([]); // Store the list of projects
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useSelector((state: RootState) => state.auth);

  // Fetch the projects when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('https://quikdb-core-beta.onrender.com/v/p', {
          headers: {
            Authorization: token,
          },
        });
        console.log('project response::', response);

        if (response.data?.data?.projects) {
          const projectList = Array.isArray(response.data.data.projects) ? response.data.data.projects : [];
          setProjects(projectList);
        } else {
          setError('No projects found.');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to fetch projects. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProjects();
    }
  }, [token]); // Dependency array includes token

  const totalProjects = projects.length; // Get the total number of projects

  return (
    <div className='mt-10'>
      <div className='flex justify-between'>
        <div className='flex flex-col gap-1'>
          <p className='font-medium text-3xl'>Overview</p>
          <p className='font-light text-base text-gray-400'>Real-time overview of your listed projects</p>
        </div>
      </div>

      <Card className='mt-7 p-5 bg-blackoff border-none flex flex-col gap-7'>
        <div className='flex justify-between'>
          <Card className='bg-transparent text-white border-[#242527] p-4 w-[32%] hover:bg-blacko'>
            <Link href='/projects'>
              <p className='text-lg'>Total projects</p>
              <div className='mt-7'>
                <p className='text-3xl font-medium'>{totalProjects} projects</p> {/* Display total number of projects */}
                <div className='flex gap-3 text-xs mt-2'>
                  <p className='flex items-center gap-1 text-green-400'>
                    10% <TrendingUp size={16} />
                  </p>
                  <p className='text-gray-400'>+2 this week</p>
                </div>
              </div>
            </Link>
          </Card>

          <Card className='bg-transparent text-white border-[#242527] p-4 w-[32%]'>
            <p className='text-lg'>Total Users</p>
            <div className='mt-7'>
              <p className='text-3xl font-medium'>5 users</p>
              <div className='flex gap-3 text-xs mt-2'>
                <p className='flex items-center gap-1 text-green-400'>
                  10% <TrendingUp size={16} />
                </p>
                <p className='text-gray-400'>+2 this week</p>
              </div>
            </div>
          </Card>
          <Card className='bg-transparent text-white border-[#242527] p-4 w-[32%]'>
            <p className='text-lg'>Total Data Groups</p>
            <div className='mt-7'>
              <p className='text-3xl font-medium'>5 data groups</p>
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

        {/* <Card className='bg-transparent text-white border-[#242527] p-4'>
          <div className='flex justify-between mb-5'>
            <div>
              <p className='text-lg'>Investor growth</p>
              <div className='flex gap-3 text-xs mt-2'>
                <p className='flex items-center gap-1 text-green-400'>
                  10% <TrendingUp size={16} />
                </p>
                <p className='text-gray-400'>+10 this week</p>
              </div>
            </div>
            <div>
              <Select>
                <SelectTrigger className='p-6 py-4 h-14 border-none bg-[#141414] rounded-2xl text-[#A5A5A5] text-[16px]'>
                  <SelectValue placeholder='All time' />
                </SelectTrigger>
                <SelectContent className='bg-[#141414] border-[#242527] text-white'>
                  <SelectGroup>
                    <SelectLabel>Databases</SelectLabel>
                    <SelectItem value='apple'>UrbanLifeSuite</SelectItem>
                    <SelectItem value='banana'>RealEstate</SelectItem>
                    <SelectItem value='blueberry'>ECommerce</SelectItem>
                    <SelectItem value='grapes'>Education</SelectItem>
                    <SelectItem value='pineapple'>Travel</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <img src='images/chart.png' alt='' />
        </Card> */}
      </Card>
    </div>
  );
};

export default Overview;
