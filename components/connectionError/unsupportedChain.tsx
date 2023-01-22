import styled from 'styled-components';
import { useCallback, useMemo } from 'react';
import { Refresh, H3, Text, Button } from '../ui';
import { useWeb3 } from 'sdk/web3-react';
import { useSDK } from 'sdk/hooks/useSDK';
import { CHAINS } from 'sdk/constants';


const UnsupportedChainStyle = styled.div`
	display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 12px;
`;

const SwitchButtonStyle = styled(Button)`
	margin-top: 15px;
`

const HeadingStyle = styled(H3)`
	margin-top: 15px;
`

function UnsupportedChain(props: any) {
	const {chains, ...rest} = props;

	// const handleSwitch = (
  //   event: MouseEvent,
  // ) : void => {
	// 
  // }; 

	return <UnsupportedChainStyle {...rest}>
					<Refresh />
					<HeadingStyle size="sm">Unsupported chain</HeadingStyle>
					<Text>Please switch to {chains} in your wallet</Text>
					{/*<SwitchButtonStyle size='sm' color = "error" onClick={ handleSwitch }>Switch Network</SwitchButtonStyle>*/}
			</UnsupportedChainStyle>
}

export default UnsupportedChain;
