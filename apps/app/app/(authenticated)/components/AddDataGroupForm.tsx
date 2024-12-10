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
import { useState } from 'react';

interface AddDataGroupProps {
  attributes: any[]; // Array of schema attributes
  selectedSchema: string | null; // Selected schema name
}

export default function AddDataGroup({ attributes, selectedSchema }: AddDataGroupProps) {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [fieldName]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!selectedSchema || !Object.keys(formData).length) return;

    // Add the creation timestamp in the background
    const timestamp = new Date().toISOString(); // Use ISO format for timestamp
    const recordWithTimestamps = {
      ...formData,
      creation_timestamp: timestamp,
      update_timestamp: timestamp, // Assuming update_timestamp is the same initially
    };

    setLoading(true);
    try {
      const response = await fetch('/api/insert-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          schemaName: selectedSchema,
          record: recordWithTimestamps,
        }),
      });

      const result = await response.json();
      if (result.success) {
        console.log('✅ Data inserted successfully.');
      } else {
        console.log('❌ Failed to insert data.');
      }
    } catch (error) {
      console.error('❌ Error inserting data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='font-medium border border-[#8A46FF]/60 px-4 w-fit text-gradient max-md:scale-90'>
          <PlusIcon className='text-gradient border border-[#8A46FF] border-dotted rounded-lg' />
          Insert Data to Schema
        </Button>
      </DialogTrigger>

      <DialogContent className='s:max-w-[425px] bg-[#111015] text-white border-[#242527] font-regular'>
        <DialogHeader>
          <DialogTitle className='font-medium'>
            {`Add Data to ${selectedSchema && selectedSchema.charAt(0).toUpperCase() + selectedSchema.slice(1)} Schema`}
          </DialogTitle>

          <DialogDescription>Fill out the form to add a new data group</DialogDescription>
        </DialogHeader>
        <hr className='border-gray-400' />

        <div className='grid gap-4 py-4'>
          {attributes.map((attribute: any, index: number) => (
            <div className='grid gap-2' key={index}>
              <Label htmlFor={attribute.name}>{attribute.name}</Label>
              <Input
                id={attribute.name}
                placeholder={`Enter ${attribute.name}`}
                className='col-span-3'
                value={formData[attribute.name] || ''}
                onChange={(e) => handleInputChange(e, attribute.name)}
              />
            </div>
          ))}
        </div>

        <DialogFooter className='sm:justify-start'>
          <Button className='bg-gradient w-fit px-4 text-[#0F1407]' onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Add'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
