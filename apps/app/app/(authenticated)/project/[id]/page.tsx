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
import { AccessTable } from '../../components/access-table';

interface Project {
  _id: string;
  name: string;
  owner: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectToken {
  _id: string;
  projectId: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  duration: number;
  type: string;
  userId: string;
}

const Project = () => {
  const [project, setProject] = useState<Project | null>(null);
  const params = useParams();
  const [tokens, setTokens] = useState<ProjectToken[]>([]);
  const projectId = params.id;
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
            const tokenResponse = await axios.get(`https://quikdb-core-beta.onrender.com/v/p/${encryptedData}/token`, {
              headers: {
                Authorization: token,
              },
            });

            if (tokenResponse.status === 200) {
              setTokens(tokenResponse.data); 
            } else {
              setError('Failed to fetch project tokens.');
            }
          } else {
            console.error('Failed to fetch project details:', response.data.error);
          }
        } catch (error) {
          console.error('Error fetching project details:', error);
           } finally {
          setLoading(false);
        }
      };

      fetchProjectDetails();
    }
  }, [projectId, token]);

  if (!project) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!project) {
    return <div>No project found.</div>;
  }

  return (
    <div className='mt-10'>
      <p className='mb-7 text-base'>
        Project / <span className='text-[#72F5DD]'>{project.name}</span>
      </p>
      <div className='flex gap-4'>
        <p>Active: {project.isActive ? 'Yes' : 'No'}</p> |<p>Created At: {project.createdAt}</p>
      </div>
      <Tabs defaultValue='groups' className='mt-5'>
        <TabsList className='flex bg-transparent text-gray-400 font-medium border-none border-b border-b-[#242527] gap-4 justify-start'>
          <TabsTrigger value='groups'>Groups</TabsTrigger>
          <TabsTrigger value='tokens'>Project Tokens</TabsTrigger>
          <TabsTrigger value='collaborators'>Project Collaborators</TabsTrigger>
          <TabsTrigger value='query'>Query</TabsTrigger>
        </TabsList>

        <TabsContent value='groups' className='bg-[#151418] text-white'>
          <Groups />
        </TabsContent>
        <TabsContent value='tokens'>
        <AccessTable tokens={tokens} />        </TabsContent>
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
