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
import { useState } from 'react';
import { CheckCircle, DollarSign, Star } from 'lucide-react';
import { DatabaseVersion } from '@/@types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useProjectTokens } from '@/hooks';

interface TokenProps {
  projectId: string | null;
}

export default function CreateToken({ projectId }: TokenProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showFreePopup, setShowFreePopup] = useState(false);
  const [showPaidPopup, setShowPaidPopup] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<DatabaseVersion>(DatabaseVersion.FREE);
  const router = useRouter();
  const { refreshTokens } = useProjectTokens(projectId ?? '');

  const createProjectToken = async (projectId: string, version: DatabaseVersion) => {
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
        toast.success('Project token created successfully!');
        if (version === DatabaseVersion.FREE) {
          setShowFreePopup(true);
        }
        refreshTokens();
      } else {
        setError(result.message || 'Failed to create project token. Please try again later.');
        toast.warning(result.message || 'Failed to create project token. Please try again later.');
      }
    } catch (error) {
      console.error('Error creating project token:', error);
      setError('Failed to create project token. Please try again later.');
      toast.error('Failed to create project token. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleVersionSelection = async (version: DatabaseVersion, projectId?: string) => {
    if (!projectId) {
      console.error('Project ID is missing, cannot create token.');
      return;
    }
    setSelectedVersion(version);
    if (version === DatabaseVersion.FREE) {
      await createProjectToken(projectId ?? '', version);
    } else {
      setShowPaidPopup(true);
    }
  };

  return (
    <>
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
            <Button onClick={() => handleVersionSelection(DatabaseVersion.FREE, projectId ?? '')} className='hover:bg-gradient' disabled={loading}>
              Free <CheckCircle />
            </Button>
            <Button
              onClick={() => handleVersionSelection(DatabaseVersion.PROFESSIONAL, projectId ?? '')}
              className='hover:bg-gradient'
              disabled={loading}
            >
              Professional <Star />
            </Button>
            <Button onClick={() => handleVersionSelection(DatabaseVersion.PREMIUM, projectId ?? '')} className='hover:bg-gradient' disabled={loading}>
              Premium <DollarSign />
            </Button>
          </div>
          {loading && <p className='text-gray-500'>Creating token...</p>}
          {error && <p className='text-red-500'>{error}</p>}
        </DialogContent>
      </Dialog>

      {showFreePopup && (
        <Dialog open={showFreePopup} onOpenChange={setShowFreePopup}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Setup Instructions</DialogTitle>
              <DialogDescription>
                You have successfully created your project token on the free plan.
                <br />
                Run the following commands to configure your project:
                <pre className='bg-gray-800 text-white p-4 rounded mt-4'>
                  npm i -g quikdb-cli-beta
                  <br />
                  quikdb config -u &lt;username&gt; -e &lt;email&gt;
                  <br />
                  quikdb install
                </pre>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}

      {showPaidPopup && (
        <Dialog open={showPaidPopup} onOpenChange={setShowPaidPopup}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Benefits of Paid Plans</DialogTitle>
              <DialogDescription>
                <p className='text-white'>
                  Selected Plan:
                  <span className='text-gradient'> {selectedVersion.toUpperCase()}</span>
                </p>

                {selectedVersion === DatabaseVersion.PROFESSIONAL && (
                  <ul className='list-disc ml-6 mt-2'>
                    <li>Enhanced performance</li>
                    <li>Priority support</li>
                    <li>Advanced analytics</li>
                  </ul>
                )}
                {selectedVersion === DatabaseVersion.PREMIUM && (
                  <ul className='list-disc ml-6 mt-2'>
                    <li>Access to exclusive features</li>
                    <li>Priority storage and faster queries</li>
                    <li>Premium support</li>
                  </ul>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                size='lg'
                className='bg-gradient px-4 text-[#0F1407]'
                onClick={() => {
                  router.push(`/checkout/${projectId}/${selectedVersion}`);
                }}
              >
                Proceed to Checkout
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
