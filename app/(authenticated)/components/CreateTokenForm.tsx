'use client';

import { Button } from '@quikdb/design-system/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@quikdb/design-system/components/ui/dialog';
import { useState } from 'react';
import { toast } from 'sonner';
import { useProjectTokens } from '@/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

interface TokenProps {
  projectId: string | null;
}

export default function CreateToken({ projectId }: TokenProps) {
  const { isInternetIdentity } = useSelector((state: RootState) => state.auth); // Access Redux state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showFreePopup, setShowFreePopup] = useState(false);
  const { refreshTokens } = useProjectTokens(projectId ?? '');

  const createProjectToken = async (projectId: string) => {
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
        body: JSON.stringify({ projectId }),
      });

      const result = await response.json();
      console.log('create-project-token-result:::', result);

      if (response.ok) {
        toast.success('Project token created successfully!');
        setShowFreePopup(true);
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

  return (
    <>
      <Button
        size='lg'
        className='bg-gradient w-fit px-4 text-[#0F1407] max-md:scale-90 max-md:text-right'
        onClick={() => createProjectToken(projectId ?? '')}
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Project Token'}
      </Button>

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
                  {isInternetIdentity
                    ? `quikdb config -u <username> -i <identity token>` // If signed in with Internet Identity
                    : `quikdb config -u <username> -e <email>`}{' '}
                  {/* Default for normal users */}
                  <br />
                  quikdb install
                </pre>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
