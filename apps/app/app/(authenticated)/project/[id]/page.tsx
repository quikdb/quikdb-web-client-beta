// app/project/[projectId]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use for client-side routing
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/design-system/components/ui/tabs';
import Groups from '../../components/Groups';
import Collaborators from '../../components/Collaborators';
import Query from '../../components/Query';
import { CryptoUtils } from '@repo/design-system/lib/cryptoUtils';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface Project {
  _id: string;
  name: string;
  owner: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const Project = () => {
  const [project, setProject] = useState<Project | null>(null);
  const params = useParams();

  const projectId = params.id;

  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (projectId) {
      const encryptedData = CryptoUtils.aesEncrypt(JSON.stringify({ id: projectId }), 'mysecurekey1234567890', 'uniqueiv12345678');

      const fetchProjectDetails = async () => {
        try {
          const response = await axios.get(`https://quikdb-core-beta.onrender.com/v/p/${encryptedData}`, {
            headers: {
              Authorization: token,
            },
          });

          if (response.status === 200) {
            setProject(response.data.data.project);
          } else {
            console.error('Failed to fetch project details:', response.data.error);
          }
        } catch (error) {
          console.error('Error fetching project details:', error);
        }
      };

      fetchProjectDetails();
    }
  }, [projectId, token]);

  if (!project) {
    return <div>Loading...</div>;
  }

  console.log(project);
  return (
    <div className='mt-10 max-md:mt-5'>
      <p className='mb-7 text-base'>
        Project / <span className='text-[#72F5DD]'>{project.name}</span>
      </p>
      <div className='flex gap-4 max-md:text-[13px]'>
        <p>Active: {project.isActive ? 'Yes' : 'No'}</p> |<p>Created At: {project.createdAt}</p>
      </div>
      <Tabs defaultValue='groups' className='mt-5'>
        <TabsList className='grid w-1/3 max-md:w-full grid-cols-3 bg-transparent text-gray-400 font-medium border-none border-b border-b-[#242527] gap-'>
          <TabsTrigger value='groups'>Groups</TabsTrigger>
          <TabsTrigger value='collaborators'>Project Collaborators</TabsTrigger>
          <TabsTrigger value='query'>Query</TabsTrigger>
        </TabsList>
        <TabsContent value='groups' className='bg-[#151418] text-white'>
          <Groups />
        </TabsContent>
        <TabsContent value='collaborators'>
          <Collaborators />
        </TabsContent>
        <TabsContent value='query'>
          <Query />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Project;
