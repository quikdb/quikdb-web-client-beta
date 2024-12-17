import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useOneTimeLink = (code: string) => {
  console.log('code from useOneTimeLink:::', code);
  const url = `/api/verify-otp-link?code=${code}`;

  const { data, error, isLoading } = useSWR(url, fetcher)

  return {
    data,
    isLoading,
    isError: error,
  };
};