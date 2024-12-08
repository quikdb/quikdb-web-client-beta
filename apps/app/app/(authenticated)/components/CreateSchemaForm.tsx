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

export default function CreateSchema() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-gradient w-fit px-4 text-[#0F1407] max-md:scale-95'>Create Schema</Button>
      </DialogTrigger>
      <DialogContent className='s:max-w-[425px] bg-[#111015] text-white border-[#242527] font-regular'>
        <DialogHeader>
          <DialogTitle className='font-medium'>Create Schema</DialogTitle>
          <DialogDescription>Lorem Ipsum lorem ipsum lorem ipsum lorem ipsum</DialogDescription>
        </DialogHeader>
        <hr className='border-gray-400' />
        <div className='grid gap-4 py-4'>
          <div className='grid gap-2'>
            <Label htmlFor='name'>Schema Name</Label>
            <Input id='name' placeholder='Enter Schema name here' className='col-span-3' />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='capacity'>Capacity</Label>
            <Input type='number' id='deadline' placeholder='1' className='col-span-3' />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='performance'>Performance Setting</Label>
            <Input id='performance' placeholder='Lisaprop' className='col-span-3' />
          </div>
        </div>
        <DialogFooter className='sm:justify-start'>
          <Button className='bg-gradient w-fit px-4 text-[#0F1407]'>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
