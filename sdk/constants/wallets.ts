export const WALLET_IDS = {
  METAMASK: 'Metamask',
} as const;

export type WalletId = typeof WALLET_IDS[keyof typeof WALLET_IDS];
