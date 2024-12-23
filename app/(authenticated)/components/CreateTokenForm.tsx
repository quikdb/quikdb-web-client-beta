'use client';

import { Button } from '@quikdb/design-system/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@quikdb/design-system/components/ui/dialog';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@quikdb/design-system/components/ui/alert-dialog';
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
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false); // Track confirmation dialog state
  const { refreshTokens } = useProjectTokens(projectId ?? '');
  const firstPartEmail = userEmail ? userEmail.split('-')[0] : '';
  const Email = userEmail ? userEmail : '';
  const firstName =  userEmail ? userEmail.split('@')[0] : '';

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
      setConfirmDialogOpen(false); // Close confirmation dialog after processing
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
        size="lg"
        className="bg-gradient w-fit px-4 text-[#0F1407] max-md:scale-90 max-md:text-right"
        onClick={() => setConfirmDialogOpen(true)} // Open confirmation dialog
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Project Token'}
      </Button>

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent className="bg-[#111015] text-white border-[#242527] font-regular">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to create a project token. This action will enable the token for this project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="bg-green-600 hover:bg-green-500 border-none rounded-3xl py-2"
              onClick={() => createProjectToken(projectId ?? '')}
            >
              Yes, Create
            </AlertDialogAction>
            <AlertDialogCancel className="bg-transparent border-[#242527] py-2 rounded-3xl">
              No, Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Dialog */}
      {showFreePopup && (
        <Dialog open={showFreePopup} onOpenChange={setShowFreePopup}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Setup Instructions</DialogTitle>
              <DialogDescription>
                You have successfully created your project token on the free plan.
                <br />
                Run the following commands to configure your project:
                <pre className="bg-gray-800 text-white p-4 rounded mt-4 whitespace-pre-wrap break-words">
                  <code>
                    {[
                      'npm i -g quikdb-cli-beta',
                      isInternetIdentity
                        ? `quikdb config -u ${firstPartEmail} -i ${internetIdentityCLI}`
                        : `quikdb config -u ${firstName} -e ${Email}`,
                      'quikdb install',
                    ].map((command, index) => (
                      <div key={index} className="mb-2">
                        <span>{command}</span>
                        <button
                          className="ml-4 p-2 rounded hover:bg-gray-700"
                          onClick={() => handleCopy(command)}
                          aria-label={copiedCommand === command ? 'Command copied' : 'Copy command'}
                        >
                          {copiedCommand === command ? (
                            <ClipboardCheck className="h-4 w-4 text-green-500" />
                          ) : (
                            <ClipboardCopy className="h-4 w-4 text-gray-500 hover:text-gray-300" />
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
