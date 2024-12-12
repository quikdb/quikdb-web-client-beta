import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useDatabase = () => {
  const url = `/api/icp-database`;

  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    result: data?.data?.result || null,
    isLoading,
    isError: error,
  };
};
