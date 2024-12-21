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
import { CheckCircle, DollarSign, Star } from 'lucide-react';
import { Label } from '@quikdb/design-system/components/ui/label';
import { useState } from 'react';
import { DatabaseVersion } from '@/@types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/hooks';

export default function ListProject() {
  const [isCreating, setIsCreating] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showFreePopup, setShowFreePopup] = useState(false);
  const [showPaidPopup, setShowPaidPopup] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<DatabaseVersion>(DatabaseVersion.FREE);

  const router = useRouter();
  const { refreshProjects } = useProjects();

  const handleCreateProject = async (version: DatabaseVersion) => {
    if (!projectName) {
      setError('Project name is required.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/create-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectName, databaseVersion: version }),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setSuccess(true);
        setProjectName('');
        setIsCreating(false);
        toast.success(`Project ${projectName} created successfully!`);

        const createdProjectId = result.data.projectData.data._id;
        setProjectId(createdProjectId);

        setShowPopup(false);
        setTimeout(() => {
          setShowPopup(true);
        }, 300);
        refreshProjects();
      } else {
        toast.warning(result.message || 'Failed to create project token. Please try again later.');
        setError(result.message || 'Failed to create project token. Please try again later.');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      setError('Failed to create project. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const createProjectToken = async (projectId: string | null, version: DatabaseVersion) => {
    if (!projectId) return;

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
        setSuccess(true);
        setShowPopup(false);
        setProjectId(null);
        toast.success('Project token created successfully!');
        if (version === DatabaseVersion.FREE) {
          setShowFreePopup(true);
        }
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
      {/* First Dialog */}
      <Dialog open={isCreating} onOpenChange={setIsCreating}>
        <DialogTrigger asChild>
          <Button size='lg' className='bg-gradient w-fit px-4 text-[#0F1407] max-md:scale-90 max-md:text-right'>
            List new project
          </Button>
        </DialogTrigger>
        <DialogContent className='s:max-w-[425px] bg-[#111015] text-white border-[#242527] font-regular'>
          <DialogHeader>
            <DialogTitle className='font-medium'>List Project</DialogTitle>
            <DialogDescription>Create a new project</DialogDescription>
          </DialogHeader>
          <hr className='border-gray-400' />
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Project Name</Label>
              <input
                type='text'
                placeholder='Enter Project Name'
                className='px-4 py-2 border rounded-md w-full'
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
          </div>
          <div className='w-full flex flex-col gap-2'>
            <Label htmlFor='name' className='mb-2'>Database Version</Label>
            <Button onClick={() => handleVersionSelection(DatabaseVersion.FREE, projectId ?? '')} className='hover:bg-gradient'>
              Free <CheckCircle />
            </Button>
            <Button onClick={() => handleVersionSelection(DatabaseVersion.PROFESSIONAL, projectId ?? '')} className='hover:bg-gradient'>
              Professional <Star />
            </Button>
            <Button onClick={() => handleVersionSelection(DatabaseVersion.PREMIUM, projectId ?? '')} className='hover:bg-gradient'>
              Premium <DollarSign />
            </Button>
          </div>
          <DialogFooter className='sm:justify-start'>
            <Button
              size='lg'
              className='font-medium bg-gradient px-4 w-fit text-[#0F1407]'
              onClick={() => handleCreateProject(selectedVersion)}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Project'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Second Dialog */}
      {showPopup && (
        <Dialog open={showPopup} onOpenChange={setShowPopup}>
          <DialogTrigger asChild>
            <Button>Create Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Token</DialogTitle>
              <DialogDescription>Select a database version for your project:</DialogDescription>
            </DialogHeader>
            <hr className='border-gray-400' />
            <div className='w-full flex flex-col gap-2'>
              <Button onClick={() => handleVersionSelection(DatabaseVersion.FREE, projectId ?? '')} className='hover:bg-gradient'>
                Free <CheckCircle />
              </Button>
              <Button onClick={() => handleVersionSelection(DatabaseVersion.PROFESSIONAL, projectId ?? '')} className='hover:bg-gradient'>
                Professional <Star />
              </Button>
              <Button onClick={() => handleVersionSelection(DatabaseVersion.PREMIUM, projectId ?? '')} className='hover:bg-gradient'>
                Premium <DollarSign />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
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

      {/* Paid Plan Popup */}
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
