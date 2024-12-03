'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { Button } from '@repo/design-system/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { CryptoUtils } from '@repo/design-system/lib/cryptoUtils';
import axios from 'axios';

import { CheckCircle, DollarSign, Star } from 'lucide-react'; // Importing icons

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@repo/design-system/components/ui/dialog';

const Overview = () => {
  const { token, userEmail } = useSelector((state: RootState) => state.auth);
  const firstName = userEmail ? userEmail.split('@')[0] : 'User';

  const [isCreating, setIsCreating] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

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
    <div className='mt-10'>
      <p className='text-2xl font-medium'>Welcome {firstName} 👋</p>
      <div className='flex flex-col justify-center items-center gap-10 h-[60vh]'>
        <div className='flex flex-col items-center'>
          <img src='/images/empty_box.png' alt='empty_box' />
          <p className='text-sm font-light text-gray-400'>No Project Available. Create a new project to get started.</p>
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
              <Button size='lg' className='font-medium bg-gradient px-4 w-fit text-[#0F1407]' onClick={handleCreateProject} disabled={loading}>
                {loading ? 'Creating...' : 'Create Project'}
              </Button>
              <Button size='lg' className='font-medium text-[#0F1407]' onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {error && <p className='text-red-500'>{error}</p>}
        {success && <p className='text-green-500'>Project created successfully!</p>}

        {/* Automatically show the popup when the project is created successfully */}
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
      </div>
    </div>
  );
};

export default Overview;
