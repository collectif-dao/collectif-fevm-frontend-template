import { CHAINS } from '../sdk/constants';

export const EXAMPLE_BY_NETWORK: {
  [key in CHAINS]: string;
} = {
  [CHAINS.FilecoinMainnet]: '0x0000000000000000000000000000000000000000',
  [CHAINS.Wallaby]: '0x23396626F2C9c0b31cC6C2729172103961Ae2A26',
  [CHAINS.Hyperspace]: '0x23396626F2C9c0b31cC6C2729172103961Ae2A26',
};

export const getExampleAddress = (chainId: CHAINS): string => {
  return EXAMPLE_BY_NETWORK[chainId];
};
