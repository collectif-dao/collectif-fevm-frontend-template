import { isMobileOrTablet } from './ua';

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      isBraveWallet?: boolean;
    };
  }
}

export const hasInjected = (): boolean => {
  try {
    return !!window.ethereum;
  } catch (error) {
    return false;
  }
};

export const isMetamaskProvider = (): boolean => {
  try {
    return !!window.ethereum?.isMetaMask;
  } catch (error) {
    return false;
  }
};

export const isBraveWalletProvider = (): boolean => {
  try {
    return !!window.ethereum?.isBraveWallet;
  } catch (error) {
    return false;
  }
};

export const isDappBrowserProvider = (): boolean => {
  return isMobileOrTablet && hasInjected();
};
