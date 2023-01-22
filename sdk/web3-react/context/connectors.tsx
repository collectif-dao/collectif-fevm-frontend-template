import { createContext, FC, memo, useMemo } from 'react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { CHAINS } from '../../constants';
import { useSDK } from '../../hooks';
import { useAutoConnect } from '../hooks/useAutoConnect';
import { CONNECTOR_NAMES } from '../constants';
import { isUrl } from '../helpers';

export interface ConnectorsContextProps {
  defaultChainId: CHAINS;
  rpc: Record<number, string>;
  appName?: string;
  appLogoUrl?: string;
  children: React.ReactNode;
}

export type ConnectorsContextValue = {
  injected: InjectedConnector;
};

export type Connector = keyof ConnectorsContextValue;

export const ConnectorsContext = createContext({} as ConnectorsContextValue);

const ProviderConnectors: FC<ConnectorsContextProps> = (props) => {
  const BASE_URL = typeof window === 'undefined' ? '' : window.location.origin;
  const DEFAULT_LOGO = `${BASE_URL}/apple-touch-icon.png`;
  const DEFAULT_NAME = 'Collective';

  const {
    rpc,
    children,
    defaultChainId,
    appName = DEFAULT_NAME,
    appLogoUrl = DEFAULT_LOGO,
  } = props;

  const { supportedChainIds } = useSDK();
  const walletConnectRPC = useMemo(
    () =>
      Object.entries(rpc).reduce(
        (result, [key, value]) => ({
          ...result,
          [key]: isUrl(value) ? value : BASE_URL + value,
        }),
        {} as ConnectorsContextProps['rpc'],
      ),
    [rpc, BASE_URL],
  );

  const connectors = useMemo(
    () => ({
      [CONNECTOR_NAMES.INJECTED]: new InjectedConnector({
        supportedChainIds,
      }),
    }),
    [
      appLogoUrl,
      appName,
      rpc,
      defaultChainId,
      supportedChainIds,
      walletConnectRPC,
    ],
  );

  useAutoConnect(connectors);

  return (
    <ConnectorsContext.Provider value={connectors}>
      {children}
    </ConnectorsContext.Provider>
  );
};

export default memo<FC<ConnectorsContextProps>>(ProviderConnectors);
