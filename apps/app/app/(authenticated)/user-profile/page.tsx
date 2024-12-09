'use client';
import { Button } from '@repo/design-system/components/ui/button';
import { Card } from '@repo/design-system/components/ui/card';
import { Checkbox } from '@repo/design-system/components/ui/checkbox';
import { ArrowLeftCircle } from 'lucide-react';
import { useState } from 'react';

const roles = [
  {
    name: 'Organization Owner',
    description: 'Provides full access to the current organization. A user can access all data, database, and projects in the organization',
  },
  {
    name: 'Organization Owner',
    description: 'Provides full access to the current organization. A user can access all data, database, and projects in the organization',
  },
  {
    name: 'Organization Member',
    description: 'Provides full access to the current organization. A user can access all data, database, and projects in the organization',
  },
];

const UserProfile = () => {
  // const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className='mt-10 max-md:mt-5'>
      <ArrowLeftCircle className='text-gray-300 mb-7 cursor-pointer' />
      <p className='text-xl font-medium'>Profile</p>

      <div className='flex gap-40 mt-5'>
        <div className='flex flex-col gap-2'>
          <p>Full Name</p>
          <p className='text-gray-400'>Dorathy Gift</p>
        </div>
        <div className='flex flex-col gap-2'>
          <p>Email Address</p>
          <p className='text-gray-400'>janedoe@gmail.com</p>
        </div>
        <div className='flex flex-col gap-2'>
          <p>Email Status</p>
          <p className='text-gray-400'>08000000000</p>
        </div>
      </div>

      <hr className='border-[#1B1C1F] my-10' />

      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-1'>
          <p className='font-medium text-xl'>Organization Roles</p>
          {isEditing && <p className='font-light text-base text-gray-400'>Select the roles you want to assign to new user.</p>}
        </div>
        <div>
          <p>Roles</p>
          {!isEditing && <p>Project Owner, Organization owner, Organization member</p>}
        </div>

        {!isEditing ? (
          <Button className='w-fit bg-transparent border border-[#40E39D] text-[#40E39D]' onClick={() => setIsEditing(true)}>
            Edit organization roles
          </Button>
        ) : (
          <div>
            <div className='flex flex-wrap gap-4 justify-between'>
              {roles.map((role, index) => (
                <Card key={index} className='bg-[#151418] text-white border-[#242527] p-5 w-[49%]'>
                  <div className='flex items-center justify-between'>
                    <p>{role.name}</p>
                    <Checkbox className='border-gray-400' />
                  </div>
                  <p className='text-gray-400 text-sm mt-3'>{role.description}</p>
                </Card>
              ))}
            </div>
            <div className='flex gap-4 mt-5'>
              <Button size='lg' className='bg-[#40E39D] w-fit px-4 text-[#0F1407]' onClick={() => setIsEditing(false)}>
                Save
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='bg-transparent text-[#40E39D] w-fit px-4 border-[#242527]'
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      <hr className='border-[#1B1C1F] my-10' />

      <div>
        <p className='font-medium'>Multi-Factor Authentication (MFA)</p>
        <p className='text-gray-400 text-sm'>
          We recommend that you enable Multi-Factor Authentication (MFA) to add extra layer of security to your Couchbase Capella account.{' '}
        </p>
      </div>

      <hr className='border-[#1B1C1F] my-10' />

      <div className='flex flex-col gap-5'>
        <div>
          <p className='font-medium'>Remove User</p>
          <p className='text-gray-400 text-sm'>
            Lorem ipsum dolor sit amet consectetur. Aliquet vitae sapien tristique mauris lacinia molestie. Bibendum in volutpat euismod risus auctor
            aenean mauris sed. Sit tellus egestas sed ac cursus nunc nisl egestas vestibulum. Aliquam pretium amet adipiscing scelerisque vitae.
          </p>
        </div>
        <Button className='w-fit bg-transparent border border-[#F43218] text-[#F43218]'>Edit organization roles</Button>
      </div>
    </div>
  );
};

export default UserProfile;
