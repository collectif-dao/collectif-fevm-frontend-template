import invariant from 'tiny-invariant';

export enum CHAINS {
  FilecoinMainnet = 314,
  Wallaby = 31415,
  Hyperspace = 3141
}

export const CHAINS_IDS = [CHAINS.Hyperspace, CHAINS.Wallaby, CHAINS.FilecoinMainnet];

export const CHAINS_COLORS: {
  [key in CHAINS]?: string;
} = {
  [CHAINS.Wallaby]: '#3099f2',
  [CHAINS.Hyperspace]: '#3099f2',
};

export const getChainColor = (chainId: CHAINS): string => {
  const color = CHAINS_COLORS[chainId];
  invariant(color != null, 'Chain is not supported');

  return color;
};
