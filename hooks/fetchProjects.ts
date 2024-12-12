import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useProjects = (): {
  projects: any[];
  total: number;
  isLoading: boolean;
  isError: any;
  refreshProjects: () => void;
} => {
  const url = '/api/projects';

  const { data, error, isLoading } = useSWR(url, fetcher);

  const refreshProjects = () => {
    mutate(url);
  };

  return {
    projects: data?.data?.projects || [],
    total: data?.data?.total || 0,
    isLoading,
    isError: error,
    refreshProjects,
  };
};
