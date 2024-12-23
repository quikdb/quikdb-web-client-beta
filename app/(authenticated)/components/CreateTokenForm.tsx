'use client';

import { Button } from '@quikdb/design-system/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@quikdb/design-system/components/ui/dialog';
import { useState } from 'react';
import { toast } from 'sonner';
import { useProjectTokens } from '@/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { ClipboardCheck, ClipboardCopy } from 'lucide-react';

interface TokenProps {
  projectId: string | null;
}

export default function CreateToken({ projectId }: TokenProps) {
  const { isInternetIdentity, internetIdentityCLI, userEmail } = useSelector((state: RootState) => state.auth); // Access Redux state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showFreePopup, setShowFreePopup] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null); // Track the copied command
  const { refreshTokens } = useProjectTokens(projectId ?? '');
  const firstPartEmail = userEmail ? userEmail.split('-')[0] : '';

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

  const handleCopy = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    toast.success('Command copied to clipboard!');
    setTimeout(() => setCopiedCommand(null), 2000);
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
                <pre className='bg-gray-800 text-white p-4 rounded mt-4 whitespace-pre-wrap break-words'>
                  <code>
                    {[
                      'npm i -g quikdb-cli-beta',
                      isInternetIdentity ? `quikdb config -u ${firstPartEmail} -i ${internetIdentityCLI}` : `quikdb config -u <username> -e <email>`,
                      'quikdb install',
                    ].map((command, index) => (
                      <div key={index} className='mb-2'>
                        <span>{command}</span>
                        <button
                          className='ml-4 p-2 rounded hover:bg-gray-700'
                          onClick={() => handleCopy(command)}
                          aria-label={copiedCommand === command ? 'Command copied' : 'Copy command'}
                        >
                          {copiedCommand === command ? (
                            <ClipboardCheck className='h-4 w-4 text-green-500' />
                          ) : (
                            <ClipboardCopy className='h-4 w-4 text-gray-500 hover:text-gray-300' />
                          )}
                        </button>
                      </div>
                    ))}
                  </code>
                </pre>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
