import { Card } from '@quikdb/design-system/components/ui/card';
import Input from '@quikdb/design-system/components/onboarding/Input';
import { PlusIcon, Search } from 'lucide-react';
import { Button } from '@quikdb/design-system/components/ui/button';
import { Label } from '@quikdb/design-system/components/ui/label';
import { CollaboratorsTable } from './collaborators-table';
import Link from 'next/link';

const Collaborators = () => {
  return (
    <Card className='bg-transparent text-white border-none p-4 px-0'>
      <div className='mb-5'>
        <div className='flex items-center relative max-md:mb-3'>
          <Label className='absolute left-4 text-gray-400'>
            <Search size={14} />
          </Label>
          <Input placeholder='Search by project name...' className='pl-10 border border-[#242527] py-3' />
          <Link href='/add-collaborators' className='absolute right-5 max-md:hidden'>
            <Button variant='outline' className='bg-gradient text-[#0F1407] border-none px-4 w-fit'>
              <PlusIcon className='text-white border border-dotted rounded-lg' />
              Add Collaborators
            </Button>
          </Link>
        </div>
        <Link href='/add-collaborators' className='lg:hidden'>
          <Button variant='outline' className='bg-gradient text-[#0F1407] border-none px-4 w-fit max-md:scale-95'>
            <PlusIcon className='text-white border border-dotted rounded-lg' />
            Add Collaborators
          </Button>
        </Link>
      </div>

      <div className='w-full'>
        <CollaboratorsTable />
      </div>
    </Card>
  );
};

export default Collaborators;
