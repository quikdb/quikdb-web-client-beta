import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useGoogleAuth = (code: string) => {
  console.log('code from useGoogleAuth:::', code);
  const url = `/api/google-callback?code=${code}`;

  const { data, error, isLoading } = useSWR(url, fetcher)

  return {
    data,
    isLoading,
    isError: error,
  };
};
