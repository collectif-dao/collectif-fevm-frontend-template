import { BaseContract } from '@ethersproject/contracts';
import { CHAINS } from '../constants';
import {
  Factory,
  createContractGetter,
} from '../contracts';
import { useMemo } from 'react';
import { useSDK } from '../hooks';

export const contractHooksFactory = <C extends BaseContract>(
  factory: Factory<C>,
  getContractAddress: (chainId: CHAINS) => string,
): {
  useContractRPC: () => C;
  useContractWeb3: () => C | null;
} => {
  const getContract = createContractGetter(factory);

  return {
    useContractRPC: () => {
      const { chainId, providerRpc } = useSDK();
      const contractAddress = getContractAddress(chainId);

      return getContract(contractAddress, providerRpc);
    },
    useContractWeb3: () => {
      const { chainId, providerWeb3 } = useSDK();
      const contractAddress = getContractAddress(chainId);

      const signer = useMemo(() => {
        return providerWeb3?.getSigner();
      }, [providerWeb3]);

      if (!signer) return null;
      return getContract(contractAddress, signer);
    },
  };
};
