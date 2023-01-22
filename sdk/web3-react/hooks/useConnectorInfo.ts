import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3 } from './useWeb3';
import { CONNECTOR_NAMES, PROVIDER_NAMES } from '../constants';
import { Connector } from '../context';
import {
  isMetamaskProvider,
} from '../helpers';

type ConnectorInfo = {
  providerName?: string;
  connectorName?: Connector;
  isMetamask: boolean;
  isInjected: boolean;
};

export const useConnectorInfo = (): ConnectorInfo => {
  const { active, connector } = useWeb3();

  const isInjected = active && connector instanceof InjectedConnector;
  const isMetamask = isInjected && isMetamaskProvider();

  const providerName = (() => {
    // Metamask should be last in this list because almost all EIP-1193 wallets
    // are trying to mimic Metamask by setting isMetamask = true
    if (isMetamask) return PROVIDER_NAMES.METAMASK;

    // General providers which doesn't specify what exact wallet is being used.
    // Works as a fallback.
    if (isInjected) return PROVIDER_NAMES.INJECTED;

    return undefined;
  })();

  const connectorName: Connector | undefined = (() => {
    if (isInjected) return CONNECTOR_NAMES.INJECTED;

    return undefined;
  })();

  return {
    connectorName,
    providerName,
    isMetamask,
    isInjected,
  };
};
