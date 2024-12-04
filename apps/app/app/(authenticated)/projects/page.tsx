'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import ListProject from '../components/ListProjectForm';
import { ProjectTable } from '../components/project-table';
import axios from 'axios';

const Projects = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('https://quikdb-core-beta.onrender.com/v/p', {
          headers: {
            Authorization: token,
          },
        });

        if (response.data?.data?.projects) {
          const projectList = Array.isArray(response.data.data.projects) 
            ? response.data.data.projects 
            : []; // Ensure it is an array
          setProjects(projectList);
        } else {
          setError('No projects found.');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to fetch projects. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [token]);

  return (
    <div className='mt-10'>
      <div className='flex justify-between'>
        <div className='flex flex-col gap-1'>
          <p className='font-medium text-3xl'>Projects</p>
          <p className='font-light text-base text-gray-400'>Real-time overview of your listed projects</p>
        </div>
        <ListProject />
      </div>
      <div>
        {loading ? (
          <p className='text-center text-gray-400'>Loading projects...</p>
        ) : error ? (
          <p className='text-center text-red-500'>{error}</p>
        ) : (
          <ProjectTable projects={projects} />
        )}
      </div>
    </div>
  );
};

export default Projects;
