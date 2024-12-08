import { Card } from '@repo/design-system/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/design-system/components/ui/accordion';
import { Input } from '@repo/design-system/components/ui/input';
import { Label } from '@repo/design-system/components/ui/label';
import { EllipsisVertical, Search } from 'lucide-react';
import { DatabaseTable } from './database-table';
import CreateDatabase from './CreateSchemaForm';
import AddDataGroup from './AddDataGroupForm';

const databases = [
  {
    id: 1,
    name: 'UrbanLifeSuite',
    deadline: '12/12/2021',
    team: 'Team 1',
    subdata: ['Houses', 'Banks', 'Transactions', 'Clients'],
  },
  {
    id: 2,
    name: 'RealEstate',
    deadline: '12/12/2021',
    team: 'Team 1',
    subdata: ['Houses', 'Banks', 'Transactions', 'Clients'],
  },
  {
    id: 3,
    name: 'ECommerce',
    deadline: '12/12/2021',
    team: 'Team 1',
    subdata: ['Houses', 'Banks', 'Transactions', 'Clients'],
  },
  {
    id: 4,
    name: 'Education',
    deadline: '12/12/2021',
    team: 'Team 1',
    subdata: ['Houses', 'Banks', 'Transactions', 'Clients'],
  },
  {
    id: 5,
    name: 'Travel',
    deadline: '12/12/2021',
    team: 'Team 1',
    subdata: ['Houses', 'Banks', 'Transactions', 'Clients'],
  },
];

const Schema = () => {
  return (
    <Card className='bg-[#151418] text-white border-[#242527] p-10 max-md:py-5 px-5 flex max-md:flex-col gap-10 mt-5'>
      <div className='flex flex-col gap-5 pr-10 border-r border-r-[#242527]'>
        <CreateDatabase />
        <div className='flex relative'>
          <Label className='absolute top-2.5 left-4 text-gray-400'>
            <Search size={14} />
          </Label>
          <Input placeholder='Search by DB name...' className='pl-10' />
        </div>

        <Accordion type='single' collapsible className='w-full max-md:flex flex-wrap'>
          {databases.map((database) => (
            <AccordionItem key={database.id} value={`item-${database.id}`} className='w-full'>
              <AccordionTrigger>
                <div className='flex items-center justify-between lg:w-[14vw] max-md:gap-52 w-fit'>
                  <p className='text-base'>{database.name}</p>
                  <EllipsisVertical size={16} className='text-gray- max-md:' />
                </div>
              </AccordionTrigger>
              <AccordionContent className='w-full flex flex-col gap-3 pl-10'>
                {database.subdata.map((subdata, index) => (
                  <p key={index} className='text-sm'>
                    {subdata}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className='w-full'>
        <div className='flex max-md:flex-col max-md:gap-3 justify-between'>
          <div className='flex flex-col gap-1'>
            <p className='font-medium text-xl'>Organizations</p>
            <p className='font-light text-xs text-gray-400'>Unlock API Access with Personal Tokens</p>
          </div>
          <AddDataGroup />
        </div>
        <DatabaseTable />
      </div>
    </Card>
  );
};

export default Schema;
