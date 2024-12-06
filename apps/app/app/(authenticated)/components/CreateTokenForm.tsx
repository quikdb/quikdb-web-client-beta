'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@repo/design-system/components/ui/dialog';
import { useState } from 'react';
import { CheckCircle, DollarSign, Star } from 'lucide-react';
import { DatabaseVersion } from '@/@types';
import { toast } from 'sonner'; 

interface TokenProps {
  projectId: string | null;
}

export default function CreateToken({ projectId }: TokenProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const createProjectToken = async (version: DatabaseVersion) => {
    if (!projectId) {
      setError('Project ID is required.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/create-project-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, databaseVersion: version }),
      });

      const result = await response.json();

      if (response.ok) {
        setDialogOpen(false); 
        setError('');
        toast.success('Project token created successfully!');
     
      } else {
        setError(result.message || 'Failed to create project token. Please try again later.');
        toast.warning(result.message || 'Failed to create project token. Please try again later.');
      }
    } catch (error) {
      console.error('Error creating project token:', error);
      setError('Failed to create project token. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleVersionSelection = (version: DatabaseVersion) => {
    if (!projectId) {
      console.error('Project ID is missing, cannot create token.');
      return;
    }
    createProjectToken(version);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size='lg' className='bg-gradient w-fit px-4 text-[#0F1407] max-md:scale-90 max-md:text-right'>
          Create Project Token
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Token</DialogTitle>
          <DialogDescription>Select a database version for your project:</DialogDescription>
        </DialogHeader>
        <hr className='border-gray-400' />
        <div className='w-full flex flex-col gap-2'>
          <Button onClick={() => handleVersionSelection(DatabaseVersion.FREE)} className='hover:bg-gradient' disabled={loading}>
            Free <CheckCircle />
          </Button>
          <Button onClick={() => handleVersionSelection(DatabaseVersion.PROFESSIONAL)} className='hover:bg-gradient' disabled={loading}>
            Professional <Star />
          </Button>
          <Button onClick={() => handleVersionSelection(DatabaseVersion.PREMIUM)} className='hover:bg-gradient' disabled={loading}>
            Premium <DollarSign />
          </Button>
        </div>
        {loading && <p className='text-gray-500'>Creating token...</p>}
        {error && <p className='text-red-500'>{error}</p>}
      </DialogContent>
    </Dialog>
  );
}
