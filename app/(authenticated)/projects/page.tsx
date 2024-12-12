'use client';
import React from 'react';
import ListProject from '../components/ListProjectForm';
import { ProjectTable } from '../components/project-table';
import { useProjects } from '@/hooks/fetchProjects';

const Projects = () => {
  const { projects } = useProjects();

  return (
    <div className='mt-10 max-md:mt-5'>
      <div className='flex justify-between max-md:flex-col max-md:gap-3'>
        <div className='flex flex-col gap-1'>
          <p className='font-medium text-3xl max-md:text-2xl'>Projects</p>
          <p className='font-light text-base text-gray-400 max-md:text-sm'>Real-time overview of your listed projects</p>
        </div>
        <ListProject />
      </div>
      <div>
        <ProjectTable projects={projects} />
      </div>
    </div>
  );
};

export default Projects;
