import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useGetSchemaData = (schemaName: string) => {
  const url = `/api/get-schema-data?schemaName=${schemaName}`;

  const { data, error, isLoading } = useSWR(url, fetcher);

  const refreshSchemaData = () => {
    mutate(url);
  };

  return {
    data,
    isLoading,
    isError: error,
    refreshSchemaData,
  };
};
