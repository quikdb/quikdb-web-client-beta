'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { Button } from '@repo/design-system/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { CryptoUtils } from '@repo/design-system/lib/cryptoUtils';
import axios from 'axios';

const Overview = () => {
  const { token, userEmail } = useSelector((state: RootState) => state.auth);

  const firstName = userEmail ? userEmail.split('@')[0] : 'User';

  const [isCreating, setIsCreating] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreateProject = async () => {
    if (!projectName) {
      setError('Project name is required.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

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
        setSuccess('Project created successfully!');
        setProjectName('');
        setIsCreating(false);
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
    <div className='mt-10 max-md:mt-5'>
      <p className='text-2xl font-medium'>Welcome {firstName} 👋</p>
      <div className='flex flex-col justify-center items-center gap-10 h-[60vh]'>
        <div className='flex flex-col items-center'>
          <img src='/images/empty_box.png' alt='empty_box' />
          <p className='text-sm font-light text-gray-400 max-md:text-center'>No Project Available. Create a new project to get started.</p>
        </div>

        {!isCreating ? (
          <Button size='lg' className='font-medium bg-gradient px-4 w-fit text-[#0F1407]' onClick={() => setIsCreating(true)}>
            <PlusIcon className='text-white border border-dotted rounded-lg' />
            New Project
          </Button>
        ) : (
          <div className='flex flex-col gap-4 items-center'>
            <input
              type='text'
              placeholder='Enter Project Name'
              className='px-4 py-2 border rounded-md w-64'
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <div className='flex gap-4'>
              <Button
                size='lg'
                className='font-medium bg-gradient px-4 w-fit text-[#0F1407]'
                onClick={handleCreateProject}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Project'}
              </Button>
              <Button size='lg' className='font-medium text-[#0F1407]' onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {error && <p className='text-red-500'>{error}</p>}
        {success && <p className='text-green-500'>{success}</p>}
      </div>
    </div>
  );
};

export default Overview;
