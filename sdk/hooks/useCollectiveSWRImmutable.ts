import { useCollectiveSWR } from './useCollectiveSWR';

export const useCollectiveSWRImmutable: typeof useCollectiveSWR = (
  key,
  fetcher,
  config,
) => {
  return useCollectiveSWR(key, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    ...config,
  });
};
