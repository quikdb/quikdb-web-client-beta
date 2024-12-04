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
import { CheckCircle, DollarSign, Star } from 'lucide-react'; // Importing icons
import { Label } from '@repo/design-system/components/ui/label';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { CryptoUtils } from '@repo/design-system/lib/cryptoUtils';
import axios from 'axios';
import { DatabaseVersion } from '@/@types';

export default function ListProject() {
  const { token, userEmail } = useSelector((state: RootState) => state.auth);
  const firstName = userEmail ? userEmail.split('@')[0] : 'User';

  const [isCreating, setIsCreating] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<DatabaseVersion>(DatabaseVersion.FREE);

  const handleCreateProject = async () => {
    if (!projectName) {
      setError('Project name is required.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const data = JSON.stringify({ id: projectName });
      const encryptedData = CryptoUtils.aesEncrypt(data, 'mysecurekey1234567890', 'uniqueiv12345678');

      const response = await axios.post(
        'https://quikdb-core-beta.onrender.com/v/p',
        { data: encryptedData },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        setProjectName('');
        setIsCreating(false);

        const createdProjectId = response.data.data.projectData.id;
        setProjectId(createdProjectId);

        setShowPopup(true);
      } else {
        setError('Failed to create project. Please try again.' + response.data.error);
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
      const encryptedData = CryptoUtils.aesEncrypt(JSON.stringify({ id: projectId }), 'mysecurekey1234567890', 'uniqueiv12345678');

      const tokenData = JSON.stringify({
        email: userEmail,
        databaseVersion: version,
        duration: 1000,
      });

      const encryptedTokenData = CryptoUtils.aesEncrypt(tokenData, 'mysecurekey1234567890', 'uniqueiv12345678');

      const response = await axios.post(
        `https://quikdb-core-beta.onrender.com/v/p/${encryptedData}/token`,
        { data: encryptedTokenData },
        {
          headers: {
            Authorization: token,
          },
        }
      );


      if (response.status === 201) {
        setSuccess(true);
        setShowPopup(false);
        setProjectId(null); 
      } else {
        setError('Failed to create project token. Please try again.' + response.data.error);
      }
    } catch (error) {
      console.error('Error creating project token:', error);
      setError('Failed to create project token. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  const handleVersionSelection = (version: DatabaseVersion) => {
    setSelectedVersion(version);
    createProjectToken(projectId, version);
  };

  return (
    <Dialog>
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
        <DialogFooter className='sm:justify-start'>
          <Button size='lg' className='font-medium bg-gradient px-4 w-fit text-[#0F1407]' onClick={handleCreateProject} disabled={loading}>
            {loading ? 'Creating...' : 'Create Project'}
          </Button>
        </DialogFooter>
      </DialogContent>

      {showPopup && (
        <Dialog open={showPopup} onOpenChange={setShowPopup}>
          <DialogTrigger asChild>
            <Button>Create Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Database Version</DialogTitle>
              <DialogDescription>Choose a database version for your project:</DialogDescription>
            </DialogHeader>
            <div className='w-full flex flex-col gap-2'>
              <Button onClick={() => handleVersionSelection(DatabaseVersion.FREE)} className='hover:bg-gradient'>
                Free <CheckCircle />
              </Button>
              <Button onClick={() => handleVersionSelection(DatabaseVersion.PROFESSIONAL)} className='hover:bg-gradient'>
                Professional <Star />
              </Button>
              <Button onClick={() => handleVersionSelection(DatabaseVersion.PREMIUM)} className='hover:bg-gradient'>
                Premium <DollarSign />
              </Button>
            </div>
            {/* <DialogFooter>
              <Button onClick={() => setShowPopup(false)}>Close</Button>
            </DialogFooter> */}
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
}
