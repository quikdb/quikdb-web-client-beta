import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useSchemas = () => {
  const url = '/api/get-schemas';

  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    schemas: data,
    isLoading,
    isError: error,
  };
};
