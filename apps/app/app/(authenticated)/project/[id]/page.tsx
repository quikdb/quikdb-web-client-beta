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

const Project = () => {
  const [project, setProject] = useState<Project | null>(null);
  const params = useParams();
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
          } else {
            setError('Failed to fetch project details.');
          }
        } catch (error) {
          setError('Error fetching project details.');
        } finally {
          setLoading(false);
        }
      };

      fetchProjectDetails();
    }
  }, [projectId, token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!project) return <div>No project found.</div>;

  return (
    <div className="mt-10">
      <p className="mb-7 text-base">
        Project / <span className="text-[#72F5DD]">{project.name}</span>
      </p>
      <div className="flex gap-4">
        <p>Active: {project.isActive ? 'Yes' : 'No'}</p> | <p>Created At: {project.createdAt}</p>
      </div>
      <Tabs defaultValue="groups" className="mt-5">
        <TabsList className="flex w-2/3 bg-transparent text-gray-400 font-medium border-none border-b border-b-[#242527] gap-">
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="tokens">Project Tokens</TabsTrigger>
          <TabsTrigger value="collaborators">Project Collaborators</TabsTrigger>
          <TabsTrigger value="query">Query</TabsTrigger>
        </TabsList>
        <TabsContent value="tokens">
          <AccessTable projectId={project._id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Project;
