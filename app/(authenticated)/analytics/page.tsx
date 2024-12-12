import { Button } from '@quikdb/design-system/components/ui/button';
import { Card } from '@quikdb/design-system/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@quikdb/design-system/components/ui/select';
import { Calendar, Clock4, TrendingUp } from 'lucide-react';

const Analytics = () => {
  return (
    <div className='mt-10 max-md:mt-5'>
      <div className='flex max-md:flex-col max-md:gap-3 justify-between'>
        <div className='flex flex-col gap-1'>
          <p className='font-medium text-3xl max-md:text-2xl'>Analytics</p>
          <p className='font-light text-base max-md:text-sm text-gray-400'>Real-time overview of your listed projects</p>
        </div>
        <div className='flex max-md:gap-2'>
          <Button>
            <Clock4 />
            <p>Last week</p>
          </Button>
          <Button className='bg-white text-black'>
            <Calendar />
            <p>04 Nov</p>
          </Button>
        </div>
      </div>
      <Card className='mt-7 p-5 bg-blackoff border-none flex flex-col gap-7'>
        <div className='flex max-md:flex-wrap max-md:gap-y-5 justify-between'>
          <Card className='bg-transparent text-white border-[#242527] p-4 w-full lg:w-[32%]'>
            <p className='text-lg max-md:text-base'>Total projects</p>
            <div className='mt-7 max-md:mt-4'>
              <p className='text-3xl max-md:text-2xl font-medium'>5 projects</p>
              <div className='flex gap-3 text-xs mt-2'>
                <p className='flex items-center gap-1 text-green-400'>
                  10% <TrendingUp size={16} />
                </p>
                <p className='text-gray-400'>+2 this week</p>
              </div>
            </div>
          </Card>
          <Card className='bg-transparent text-white border-[#242527] p-4 w-full lg:w-[32%]'>
            <p className='text-lg max-md:text-base'>Total projects</p>
            <div className='mt-7'>
              <p className='text-3xl max-md:text-2xl font-medium'>5 projects</p>
              <div className='flex gap-3 text-xs mt-2'>
                <p className='flex items-center gap-1 text-green-400'>
                  10% <TrendingUp size={16} />
                </p>
                <p className='text-gray-400'>+2 this week</p>
              </div>
            </div>
          </Card>
          <Card className='bg-transparent text-white border-[#242527] p-4 w-full lg:w-[32%]'>
            <p className='text-lg max-md:text-base'>Total projects</p>
            <div className='mt-7'>
              <p className='text-3xl max-md:text-2xl font-medium'>5 projects</p>
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

        <Card className='bg-transparent text-white border-[#242527] p-4'>
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
        </Card>
      </Card>
    </div>
  );
};

export default Analytics;
