import { Button } from '@repo/design-system/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/design-system/components/ui/dialog';
import { Input } from '@repo/design-system/components/ui/input';
import { Label } from '@repo/design-system/components/ui/label';
import { PlusIcon } from 'lucide-react';

export default function AddDataGroup() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='font-satoshi_medium border border-[#8A46FF]/60 px-4 w-fit text-gradient'>
          <PlusIcon className='text-gradient border border-[#8A46FF] border-dotted rounded-lg' />
          Add Data Group
        </Button>
      </DialogTrigger>
      <DialogContent className='s:max-w-[425px] bg-[#111015] text-white border-[#242527] font-satoshi_regular'>
        <DialogHeader>
          <DialogTitle className='font-satoshi_medium'>Add Data Group</DialogTitle>
          <DialogDescription>Lorem Ipsum lorem ipsum lorem ipsum lorem ipsum</DialogDescription>
        </DialogHeader>
        <hr className='border-gray-400' />
        <div className='grid gap-4 py-4'>
          <div className='grid gap-2'>
            <Label htmlFor='name'>Data Group Name</Label>
            <Input id='name' placeholder='Lisaprop' className='col-span-3' />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='attributes'>Attributes</Label>
            <Input id='attributes' placeholder='Lisaprop' className='col-span-3' />
          </div>
        </div>
        <DialogFooter className='sm:justify-start'>
          <Button className='bg-gradient w-fit px-4 text-[#0F1407]'>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
