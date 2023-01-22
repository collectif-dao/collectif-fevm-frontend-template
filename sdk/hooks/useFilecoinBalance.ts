import warning from 'tiny-warning';
import { useCallback, useEffect } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { useSDK } from './useSDK';
import { useFilecoinSWR } from './useFilecoinSWR';
import { SWRResponse } from './useCollectiveSWR';
import { useDebounceCallback } from './useDebounceCallback';

export const useFilecoinBalance = (
  account?: string,
): SWRResponse<BigNumber> => {
  const { providerWeb3, account: sdkAccount } = useSDK();
  const mergedAccount = account ?? sdkAccount;

  const result = useFilecoinSWR({
    shouldFetch: !!mergedAccount,
    method: 'getBalance',
    params: [mergedAccount, 'latest'],
  });

  const updateBalance = useDebounceCallback(result.update);

  const subscribeToUpdates = useCallback(() => {
    if (!mergedAccount || !providerWeb3) return;

    try {
      providerWeb3.on('block', updateBalance);

      return () => {
        providerWeb3.off('block', updateBalance);
      };
    } catch (error) {
      return warning(false, 'Cannot subscribe to Block event');
    }
  }, [providerWeb3, mergedAccount, updateBalance]);

  useEffect(subscribeToUpdates, [subscribeToUpdates]);

  return result;
};
