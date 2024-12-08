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
// import { database } from '../../../backend/.dfx/local/canisters/database/index';
import { Principal } from '@dfinity/principal';
import { useState, useEffect } from 'react';

export default function CreateSchema() {
  const [schemaName, setSchemaName] = useState('');
  const [capacity, setCapacity] = useState(1);
  const [performance, setPerformance] = useState('');
  const [isOwner, setIsOwner] = useState(false);

  const handleCreateSchema = async () => {
    if (!isOwner) {
      alert('You are not the owner of the canister.');
      return;
    }

    try {
      const customFields = [
        { name: 'field1', fieldType: 'text' }, // Example field, can be dynamic
        { name: 'field2', fieldType: 'number' }, // Another example
      ];

      // User-defined indexes (this can be dynamic)
      const userDefinedIndexes = ['field1'];

      // Call createSchema function
      // // const result = await database.createSchema(schemaName, customFields, userDefinedIndexes);
      // if (result._tag === 'ok') {
      //   alert('Schema created successfully!');
      // } else {
      //   alert('Error creating schema: ' + result.err);
      // }
    } catch (error) {
      console.error('Error while creating schema:', error);
      alert('An error occurred while creating the schema.');
    }
  };

  const handleChangeSchemaName = (e: React.ChangeEvent<HTMLInputElement>) => setSchemaName(e.target.value);
  const handleChangeCapacity = (e: React.ChangeEvent<HTMLInputElement>) => setCapacity(Number(e.target.value));
  const handleChangePerformance = (e: React.ChangeEvent<HTMLInputElement>) => setPerformance(e.target.value);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-gradient w-fit px-4 text-[#0F1407] max-md:scale-95'>Create Schema</Button>
      </DialogTrigger>
      <DialogContent className='s:max-w-[425px] bg-[#111015] text-white border-[#242527] font-regular'>
        <DialogHeader>
          <DialogTitle className='font-medium'>Create Schema</DialogTitle>
          <DialogDescription>You must be the owner of the canister to create a schema.</DialogDescription>
        </DialogHeader>
        <hr className='border-gray-400' />
        <div className='grid gap-4 py-4'>
          <div className='grid gap-2'>
            <Label htmlFor='name'>Schema Name</Label>
            <Input id='name' value={schemaName} onChange={handleChangeSchemaName} placeholder='Enter Schema name here' className='col-span-3' />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='capacity'>Capacity</Label>
            <Input type='number' id='capacity' value={capacity} onChange={handleChangeCapacity} placeholder='1' className='col-span-3' />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='performance'>Performance Setting</Label>
            <Input id='performance' value={performance} onChange={handleChangePerformance} placeholder='Lisaprop' className='col-span-3' />
          </div>
        </div>
        <DialogFooter className='sm:justify-start'>
          <Button className='bg-gradient w-fit px-4 text-[#0F1407]' onClick={handleCreateSchema} disabled={!isOwner}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
