import { useSupportedChains, useWeb3 } from 'sdk/web3-react';
import { CHAINS } from 'sdk/constants';
import { useMemo } from 'react';
import UnsupportedChain from './unsupportedChain.tsx';
import { Link } from 'components/ui';
 
export const useErrorMessage = (): string | undefined => {
  const { error } = useWeb3();
  const { isUnsupported, supportedChains } = useSupportedChains();

  const chains = useMemo(() => {
    if (supportedChains.length === 1) {
      const {chainId, name } = supportedChains[0]; 
      const chainName = CHAINS[chainId] || name;
      const chainLink = `https://chainlist.org/?testnets=true&search=${chainName}`;
      return <Link href={chainLink}>{chainName}</Link>
    }

    const chains = supportedChains.reduce(
      (acc, { chainId, name }, index, arr) => {
        const chainName = CHAINS[chainId] || name;
        const chainLink = `https://chainlist.org/chain/${chainId}`;

        if (index === 0) {
          acc.push(<Link key={chainName} href={chainLink}>{chainName}</Link>)
        }

        if (index > 0 && index !== arr.length-1) {
          acc.push(', ');
          acc.push(<Link key={chainName} href={chainLink}>{chainName}</Link>)
        }

        if (index === arr.length-1) {
          acc.push(' or ')
          acc.push(<Link key={chainName} href={chainLink}>{chainName}</Link>)
        } 

        return acc
      }, []);

    return (<>
      {chains}
    </>);

  }, [supportedChains]);

  if (isUnsupported) {
    return <UnsupportedChain chains ={ chains }/>;
  }

  return error?.message;
};