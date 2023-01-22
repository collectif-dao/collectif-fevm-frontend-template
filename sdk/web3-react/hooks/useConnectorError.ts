import { useWeb3 } from './useWeb3';

export const useConnectorError = (): Error | undefined => {
  const { error } = useWeb3();

  if (!error) {
    return error;
  }

  return error;
};
