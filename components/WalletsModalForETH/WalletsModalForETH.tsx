import React from 'react';
import {
  ConnectMetamask,
} from '../connectButtons';
import { ButtonsCommonProps, WalletsModal } from '../WalletsModal';
import { WalletsModalForEthProps } from './types';
import { WALLET_IDS, WalletId } from '../constants';

const walletsButtons: { [K in WalletId]: React.ComponentType } = {
  [WALLET_IDS.METAMASK]: ConnectMetamask,
};

function getWalletButton(name: WalletId, props: ButtonsCommonProps) {
  return React.createElement(walletsButtons[name], {
    key: name,
    ...props,
  });
}

function getWalletsButtons(
  commonProps: ButtonsCommonProps,
  hiddenWallets: WalletsModalForEthProps['hiddenWallets'] = [],
) {
  let wallets: WalletId[] = [
    WALLET_IDS.METAMASK
  ];

  wallets = wallets.filter((wallet) => !hiddenWallets.includes(wallet));

  return wallets.map((wallet) => getWalletButton(wallet, commonProps));
}

export function WalletsModalForEth(
  props: WalletsModalForEthProps,
): JSX.Element {
  return (
    <WalletsModal {...props}>
      {(commonProps) => getWalletsButtons(commonProps, props.hiddenWallets)}
    </WalletsModal>
  );
}
