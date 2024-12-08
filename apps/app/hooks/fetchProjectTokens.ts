import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useProjectTokens = (projectId: string) => {
  const url = `/api/project-tokens?projectId=${projectId}`

  const { data, error, isLoading } = useSWR(url, fetcher)

  return {
    tokens: data?.data?.tokens || [],
    isLoading,
    isError: error,
  };
};
