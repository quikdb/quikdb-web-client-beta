import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Input } from '../../components/onboarding';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Pencil2Icon } from '@radix-ui/react-icons';

interface TokenProps {
  isEditing?: boolean;
}

export default function CreateToken({ isEditing }: TokenProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {!isEditing ? (
          <Button size='lg' className='bg-gradient w-fit px-4 text-[#0F1407]'>
            {!isEditing ? 'Create Token' : 'Edit Permissions'}
          </Button>
        ) : (
          <Pencil2Icon className='w-4 h-5 cursor-pointer' />
        )}
      </DialogTrigger>
      <DialogContent className='s:max-w-[425px] bg-[#111015] text-white border-[#242527] font-satoshi_regular'>
        <DialogHeader>
          <DialogTitle className='font-satoshi_medium'>Create Token</DialogTitle>
          <DialogDescription>
            {!isEditing ? 'Set Up a Custom Access Token for Your Project Needs' : 'Edit Token Settings to Refine Access Privileges'}
          </DialogDescription>
        </DialogHeader>
        <hr className='border-gray-400' />
        <div className='grid gap-4 py-4'>
          <div className='grid gap-2'>
            <Label htmlFor='name'>Token Name</Label>
            <Input id='name' placeholder='Lisaprop' className='col-span-3' />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='username'>Set token permissions</Label>
            <Select>
              <SelectTrigger className='p-6 py-4 h-14 border-none bg-[#141414] rounded-2xl text-[#A5A5A5] text-[16px]'>
                <SelectValue placeholder='Set permissions' />
              </SelectTrigger>
              <SelectContent className='bg-[#141414] border-[#242527] text-white'>
                <SelectGroup>
                  <SelectItem value='full_access'>Full Access</SelectItem>
                  <SelectItem value='read_only'>Read-only</SelectItem>
                  <SelectItem value='backup_only'>Backup Only</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className='sm:justify-start'>
          <Button className='bg-gradient w-fit px-4 text-[#0F1407]'>{!isEditing ? 'Generate Token' : 'Edit'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
