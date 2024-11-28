// import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/design-system/components/ui/tabs';
import Groups from '../components/Groups';
import Collaborators from '../components/Collaborators';
import Query from '../components/Query';

function Project() {
  // const { projectId } = useParams();

  return (
    <div className='mt-10'>
      <p className='mb-7 text-base'>
        Project / <span className='text-[#72F5DD]'>UrbanLifeSuite</span>
      </p>
      <p>UrbanLifeSuite</p>
      <Tabs defaultValue='groups' className='mt-5'>
        <TabsList className='grid w-1/3 grid-cols-3 bg-transparent text-gray-400 font-satoshi_medium border-none border-b border-b-[#242527] gap-'>
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
}

export default Project;
