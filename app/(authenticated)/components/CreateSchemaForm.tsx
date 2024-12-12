import { useSchemas } from '@/hooks';
import { Button } from '@quikdb/design-system/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@quikdb/design-system/components/ui/dialog';
import { Input } from '@quikdb/design-system/components/ui/input';
import { Label } from '@quikdb/design-system/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CreateSchema() {
  const [schemaName, setSchemaName] = useState('');
  const [fields, setFields] = useState([{ name: '', fieldType: 'text' }]);
  const [userDefinedIndexes, setUserDefinedIndexes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { refreshSchemas } = useSchemas();

  const handleAddField = () => {
    setFields([...fields, { name: '', fieldType: 'text' }]);
  };

  const handleRemoveField = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
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
    if (!schemaName || fields.some((field) => !field.name || !field.fieldType)) {
      toast.warning('Please provide valid schema name and fields.');
      return;
    }

    setLoading(true);

    try {
      const customFields = fields.map((field) => ({
        name: field.name,
        fieldType: field.fieldType,
      }));

      const response = await fetch('/api/create-schema', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schemaName, customFields, userDefinedIndexes }),
      });

      if (response.ok) {
        toast.success('Schema created successfully.');
        setOpen(false);
        refreshSchemas();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error + 'Schema creation failed.');
      }
    } catch (error) {
      toast.warning('An error occurred while creating the schema.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeSchemaName = (e: React.ChangeEvent<HTMLInputElement>) => setSchemaName(e.target.value);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                <Button onClick={() => handleRemoveField(index)} className='border-none rounded-3xl bg-gray-900 hover:bg-red-600 text-white'>Remove</Button>
              </div>
            ))}
            <Button onClick={handleAddField} className='mt-2'>
              Add Field
            </Button>
          </div>

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
          <Button onClick={handleCreateSchema} className='bg-gradient w-fit px-4 text-[#0F1407]' disabled={loading}>
            {loading ? (
              <span className='flex items-center'>
                <svg
                  className='animate-spin h-5 w-5 mr-2 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                >
                  <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' className='opacity-25' />
                  <path d='M4 12a8 8 0 1 0 16 0 8 8 0 1 0-16 0' fill='none' stroke='currentColor' strokeWidth='4' className='opacity-75' />
                </svg>
                Creating...
              </span>
            ) : (
              'Create Schema'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
