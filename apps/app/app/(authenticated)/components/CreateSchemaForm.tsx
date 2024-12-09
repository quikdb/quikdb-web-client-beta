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
import { useState } from 'react';
// import { database } from '../../../../backend/src/declarations/database/index';
import { toast } from 'sonner';

export default function CreateSchema() {
  const [schemaName, setSchemaName] = useState('');
  const [fields, setFields] = useState([{ name: '', fieldType: 'text' }]);
  const [userDefinedIndexes, setUserDefinedIndexes] = useState<string[]>([]);

  const handleAddField = () => {
    setFields([...fields, { name: '', fieldType: 'text' }]);
  };

  const handleFieldNameChange = (index: number, name: string) => {
    const updatedFields = [...fields];
    updatedFields[index].name = name;
    setFields(updatedFields);
  };

  const handleFieldTypeChange = (index: number, type: string) => {
    const updatedFields = [...fields];
    updatedFields[index].fieldType = type;
    setFields(updatedFields);
  };

  const handleToggleIndex = (fieldName: string) => {
    setUserDefinedIndexes((prevIndexes) =>
      prevIndexes.includes(fieldName) ? prevIndexes.filter((index) => index !== fieldName) : [...prevIndexes, fieldName]
    );
  };

  const handleCreateSchema = async () => {


    try {
      const customFields = fields.map((field) => ({
        name: field.name,
        fieldType: field.fieldType,
      }));

      // Call backend to create schema
      // const result = await database.createSchema(schemaName, customFields, userDefinedIndexes);
      // console.log("createSchema result", result);
      // if (result._tag === 'ok') {
      //   toast.success('Schema created successfully!');
      // } else {
      //   toast.warning('Error creating schema: ' + result.err);
      // }

      // console.log('Schema:', schemaName, customFields, userDefinedIndexes);
    } catch (error) {
      console.error('Error while creating schema:', error);
      toast.warning('An error occurred while creating the schema.');
    }
  };

  const handleChangeSchemaName = (e: React.ChangeEvent<HTMLInputElement>) => setSchemaName(e.target.value);

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
          {/* Schema Name */}
          <div className='grid gap-2'>
            <Label htmlFor='name'>Schema Name</Label>
            <Input id='name' value={schemaName} onChange={handleChangeSchemaName} placeholder='Enter Schema name here' className='col-span-3' />
          </div>

          {/* Fields Inputs */}
          <div className='grid gap-4'>
            <Label>Fields</Label>
            {fields.map((field, index) => (
              <div key={index} className='flex gap-4'>
                <div className='flex-1'>
                  <Input placeholder='Field Name' value={field.name} onChange={(e) => handleFieldNameChange(index, e.target.value)} />
                </div>
                <div className='flex-1'>
                  <select value={field.fieldType} onChange={(e) => handleFieldTypeChange(index, e.target.value)} className='w-full'>
                    <option value='text'>Text</option>
                    <option value='number'>Number</option>
                    <option value='timestamp'>Timestamp</option>
                  </select>
                </div>
              </div>
            ))}
            <Button onClick={handleAddField} className='mt-2'>
              Add Field
            </Button>
          </div>

          {/* Select Indexes */}
          <div className='grid gap-2'>
            <Label>Indexes</Label>
            {fields.map((field, index) => (
              <div key={index} className='flex items-center gap-2'>
                <input type='checkbox' checked={userDefinedIndexes.includes(field.name)} onChange={() => handleToggleIndex(field.name)} />
                <span>{field.name}</span>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className='sm:justify-start'>
          <Button onClick={handleCreateSchema} className='bg-gradient w-fit px-4 text-[#0F1407]'>
            Create Schema
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
