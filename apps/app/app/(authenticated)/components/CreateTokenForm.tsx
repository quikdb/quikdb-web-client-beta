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
import { Label } from '@repo/design-system/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@repo/design-system/components/ui/select';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { CryptoUtils } from '@repo/design-system/lib/cryptoUtils';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { DatabaseVersion } from '@/@types';
import axios from 'axios';
import { CheckCircle, DollarSign, Star } from 'lucide-react';

interface TokenProps {
  projectId: string | null;
}

export default function CreateToken({ projectId }: TokenProps) {
  const { token, userEmail } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const createProjectToken = async (version: DatabaseVersion) => {
    if (!projectId) {
      setError('Project ID is required.');
      return;
    }

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

      console.log('create project token response::', response);

      if (response.status === 201) {
        setSuccess(true);
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
    createProjectToken(version);
  };

  return (
    <Dialog>
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
      </DialogContent>
    </Dialog>
  );
}
