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

export default function ListProject() {
  const { token, userEmail } = useSelector((state: RootState) => state.auth);
  const firstName = userEmail ? userEmail.split('@')[0] : 'User';

  const [isCreating, setIsCreating] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

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
        setShowPopup(true); // Show the popup when the project is created successfully
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='lg' className='bg-gradient w-fit px-4 text-[#0F1407]'>
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Database Version</DialogTitle>
            </DialogHeader>
            <DialogDescription className='space-y-4'>
              <p> Your project has been created successfully. You can now select a database for your project</p>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-3'>
                  <CheckCircle className='text-green-500' />
                  <span className='text-lg'>Free</span>
                  <Button size='sm' className='ml-auto'>
                    Select
                  </Button>
                </div>
                <div className='flex items-center gap-3'>
                  <DollarSign className='text-yellow-500' />
                  <span className='text-lg'>Premium ($1/month)</span>
                  <Button size='sm' className='ml-auto'>
                    Select
                  </Button>
                </div>
                <div className='flex items-center gap-3'>
                  <Star className='text-blue-500' />
                  <span className='text-lg'>Professional ($5/month)</span>
                  <Button size='sm' className='ml-auto'>
                    Select
                  </Button>
                </div>
              </div>
            </DialogDescription>
            {/* <DialogFooter>
                <Button size='lg' onClick={() => setShowPopup(false)}>
                  Close
                </Button>
              </DialogFooter> */}
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
}
