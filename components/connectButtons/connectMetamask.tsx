import { FC, useCallback } from 'react';
import { useConnectorMetamask } from '../../sdk/web3-react';
import {
  MetaMaskCircle,
  MetaMaskCircleInversion,
} from '../ui';
import { ConnectWalletProps } from './types';
import ConnectButton from './connectButton';

const ConnectMetamask: FC<ConnectWalletProps> = (props: ConnectWalletProps) => {
  const {
    onConnect,
    shouldInvertWalletIcon,
    setRequirements,
    ...rest
  } = props;

  const { connect } = useConnectorMetamask();

  const WalletIcon = shouldInvertWalletIcon
    ? MetaMaskCircleInversion
    : MetaMaskCircle;

  const handleConnect = useCallback(async () => {
    onConnect?.();
    await connect();
  }, [connect, onConnect, setRequirements, WalletIcon]);

  return (
    <ConnectButton
      {...rest}
      iconSrcOrReactElement={<WalletIcon />}
      onClick={handleConnect}
    >
      MetaMask
    </ConnectButton>
  );
};

export default ConnectMetamask;
