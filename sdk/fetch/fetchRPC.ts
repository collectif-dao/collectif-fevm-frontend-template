import invariant from 'tiny-invariant';
import { CHAINS } from '../constants';
import { fetchWithFallbacks } from './fetchWithFallbacks';
import { RequestInit, Response } from './fetch';

export type FetRPCUrl = (chainId: CHAINS) => string;

export interface FetchRPCOptions extends RequestInit {
  urls?: (string | FetRPCUrl)[];
}

export type FetchRPC = (
  chainId: CHAINS,
  options: FetchRPCOptions,
) => Promise<Response>;

export type CreateRPCFetcher = (options: FetchRPCOptions) => FetchRPC;

export const fetchRPC: FetchRPC = (chainId, options) => {
  const {urls = [], ...init } = options;

  const customUrls = urls.map((value) => {
    let url = value;
    if (typeof value === 'function') url = value(chainId);
    invariant(typeof url === 'string', 'URL should be a string');

    return url;
  });

  invariant(customUrls.length > 0, 'There are no API keys or URLs provided');

  return fetchWithFallbacks(customUrls, { method: 'POST', ...init });
};
