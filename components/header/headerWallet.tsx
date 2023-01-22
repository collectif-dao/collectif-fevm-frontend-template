import { FC } from 'react';
import { CHAINS, getChainColor } from '../../sdk/constants';
import { useSDK } from '../../sdk/hooks';
import { useWeb3 } from '../../sdk/web3-react';

import WalletButton from '../walletButton';
import WalletConnect from '../walletConnect';
import { Link } from '../ui';

import { HeaderWalletChainStyle } from './headerWalletStyles';

const HeaderWallet: FC = () => {
  const { active } = useWeb3();
  const { chainId } = useSDK();

  const chainName = CHAINS[chainId];
  const testNet = chainId !== CHAINS.FilecoinMainnet;
  const showNet = testNet && active;

  const faucetLink = chainName === "Wallaby" ? "https://wallaby.network/" : "https://hyperspace.yoga/#faucet"

  return (
    <>
      {showNet && (
        <HeaderWalletChainStyle $color={getChainColor(chainId)}>
          {/*{chainName} */}
          <Link href={faucetLink}>Get testnet FIL</Link>
        </HeaderWalletChainStyle>
      )}
      {active ? <WalletButton /> : <WalletConnect size="sm" />}
    </>
  );
};

export default HeaderWallet;
