import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@repo/design-system/components/ui/breadcrumb';
import { Button } from '@repo/design-system/components/ui/button';
import { Separator } from '@repo/design-system/components/ui/separator';
import { SidebarTrigger } from '@repo/design-system/components/ui/sidebar';
import { PlusIcon } from 'lucide-react';
import type { Metadata } from 'next';
import type { ReactElement } from 'react';

const title = 'Acme Inc';
const description = 'My application.';

export const metadata: Metadata = {
  title,
  description,
};

const App = async (): Promise<ReactElement> => {
  return (
    <div className='mt-10'>
      <p className='text-2xl font-satoshi_medium'>Welcome Oluwatimileyin 👋</p>
      <div className='flex flex-col justify-center items-center gap-10 h-[60vh]'>
        <div className='flex flex-col items-center'>
          <img src='/images/empty_box.png' alt='empty_box' />
          <p className='text-sm font-light text-gray-400'>No Project Available . Create a new project to get stated</p>
        </div>
        <Button size='lg' className='font-satoshi_medium bg-gradient px-4 w-fit text-[#0F1407]'>
          <PlusIcon className='text-white border border-dotted rounded-lg' />
          New Project
        </Button>
      </div>
    </div>
  );
};

export default App;
