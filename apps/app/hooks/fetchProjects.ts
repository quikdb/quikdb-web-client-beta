import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useProjects = () => {
  const { data, error, isLoading } = useSWR(`/api/projects`, fetcher);

  return {
    projects: data?.data?.projects || [],
    total: data?.data?.total || 0,
    isLoading,
    isError: error,
  };
};
