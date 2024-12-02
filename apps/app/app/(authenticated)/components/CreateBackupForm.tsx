'use client';

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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@repo/design-system/components/ui/select';

export default function CreateBackup() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-gradient w-fit px-4 text-[#0F1407]'>Create Backup</Button>
      </DialogTrigger>
      <DialogContent className='s:max-w-[425px] bg-[#111015] text-white border-[#242527] font-regular'>
        <DialogHeader>
          <DialogTitle className='font-medium'>Create Backup</DialogTitle>
          <DialogDescription>Lorem Ipsum lorem ipsum lorem ipsum lorem ipsum</DialogDescription>
        </DialogHeader>
        <hr className='border-gray-400' />
        <div className='grid gap-4 py-4'>
          <div className='grid gap-2'>
            <Label htmlFor='name'>Backup Name</Label>
            <Input id='name' placeholder='Enter backup name here' className='col-span-3' />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='capacity'>Backup frequency</Label>
            <Select>
              <SelectTrigger className='p-6 py-4 h-14 border-none bg-[#141414] rounded-2xl text-[#A5A5A5] text-[16px]'>
                <SelectValue placeholder='Set frequency' />
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
          <Button className='bg-gradient w-fit px-4 text-[#0F1407]'>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
