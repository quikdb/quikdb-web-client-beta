import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Input } from '../../components/onboarding';
import { Label } from '../../components/ui/label';

export default function EditDatabase() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-gradient w-fit px-4 text-[#0F1407]'>Edit Database</Button>
      </DialogTrigger>
      <DialogContent className='s:max-w-[425px] bg-[#111015] text-white border-[#242527] font-satoshi_regular'>
        <DialogHeader>
          <DialogTitle className='font-satoshi_medium'>Edit Database</DialogTitle>
          <DialogDescription>Lorem Ipsum lorem ipsum lorem ipsum lorem ipsum</DialogDescription>
        </DialogHeader>
        <hr className='border-gray-400' />
        <div className='grid gap-4 py-4'>
          <div className='grid gap-2'>
            <Label htmlFor='name'>Database Name</Label>
            <Input id='name' placeholder='Enter database name here' className='col-span-3' />
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
          <Button className='bg-gradient w-fit px-4 text-[#0F1407]'>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
