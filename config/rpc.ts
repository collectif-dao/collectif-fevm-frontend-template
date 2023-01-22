import { CHAINS } from '../sdk/constants';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const { basePath } = serverRuntimeConfig;

export const getBackendRPCPath = (chainId: CHAINS): string => {
  return `${basePath ?? ''}/api/rpc?chainId=${chainId}`;
};

export const backendRPC = {
  [CHAINS.FilecoinMainnet]: getBackendRPCPath(CHAINS.FilecoinMainnet),
  [CHAINS.Wallaby]: getBackendRPCPath(CHAINS.Wallaby),
  [CHAINS.Hyperspace]: getBackendRPCPath(CHAINS.Hyperspace),
};
