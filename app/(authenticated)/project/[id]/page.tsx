'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@quikdb/design-system/components/ui/tabs';
import Schema from '../../components/Schema';
import Collaborators from '../../components/Collaborators';
import Query from '../../components/Query';
import { useParams } from 'next/navigation';
import { AccessTable } from '../../components/access-table';
import { useProject, useProjects } from '@/hooks';
interface Project {
  _id: string;
  name: string;
  owner: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const Project = () => {
  const params = useParams();
  const projectId = params.id as string;

  const { project, isLoading, isError } = useProject(projectId);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error fetching project details</div>;

  if (!project) return <div>No project found.</div>;

  return (
    <div className='mt-10'>
      <p className='mb-7 text-base'>
        Project / <span className='text-[#72F5DD]'>{project.name}</span>
      </p>
      <div className='flex gap-4'>
        <p>Active: {project.isActive ? 'Yes' : 'No'}</p> | <p>Created At: {project.createdAt}</p>
      </div>
      <Tabs defaultValue='tokens' className='mt-5'>
        <TabsList className='flex bg-transparent text-gray-400 font-medium border-none border-b border-b-[#242527] gap-4 justify-start'>
          <TabsTrigger value='tokens'>Project Tokens</TabsTrigger>
          <TabsTrigger value='schema'>Schema</TabsTrigger>
          <TabsTrigger value='collaborators'>Project Collaborators</TabsTrigger>
          <TabsTrigger value='query'>Query</TabsTrigger>
        </TabsList>
        <TabsContent value='tokens'>
          <AccessTable projectId={project._id} />
        </TabsContent>
        <TabsContent value='schema' className='bg-[#151418] text-white'>
          <Schema />
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
