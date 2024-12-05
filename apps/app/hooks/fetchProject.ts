import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useProject = (projectId: string) => {
  const url = `/api/get-project?projectId=${projectId}`;

  const { data, error, isLoading } = useSWR(url, fetcher)

  return {
    project: data?.data?.project || null,
    isLoading,
    isError: error,
  };
};
