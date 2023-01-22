import { FormEventHandler, FormEvent, FC, ChangeEventHandler, ChangeEvent, MouseEvent } from 'react';
import Layout from 'components/layout';
import StackedBlock from 'components/stackedBlock';
import ConnectionError from 'components/connectionError'
import Head from 'next/head';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { trackEvent, MatomoEventType } from '@lidofinance/analytics-matomo';
import { Input, Button, Fil, Clfil, Wallet, InlineLoader } from '../components/ui';
import { useContractSWR } from 'sdk/hooks/useContractSWR';
import { useExampleContractRPC, useExampleContractWeb3, useModal } from '../hooks';
import { useWeb3 } from 'sdk/web3-react';
import { useFilecoinBalance, useSDK } from 'sdk/hooks';
import FormatToken from 'components/formatToken';
import { formatBalance, stringToEther } from '../utils';
import { MODAL } from '../providers';

const STAKING_RATIO = 1.0;

const DecoratorLabelStyle = styled.span`
  display: inline-block;
  font-size: 30px;
  line-height: 39px;
  font-weight: 600;
  margin-left: 15px;
`;

const InputWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spaceMap.md}px;
`;

const ButtonWrapper = styled.div`
  padding: 30px 30px 0 30px;
`;

const WalletSectionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 30px;
`

const WalletBalanceStyles = styled.span`
  display: inline-block;
  margin-left: 10px;
`

const WalletWrapperStyles = styled.span`
  margin-right: 20px;
  display: inline-flex;
  align-items: center;
`

const WalledBalanceLoaderStyle = styled(InlineLoader)`
  width: 60px;
`;

export default function Home() {
  const [value, setValue] = useState('');
  const { active } = useWeb3();
  const { account } = useSDK();
  const { data: balance, initialLoading } = useFilecoinBalance();

  const contractRPC = useExampleContractRPC();
  const contractWeb3 = useExampleContractWeb3();

  const {data: clFilBalance, initialClFilLoading} = useContractSWR({
    contract: contractRPC,
    method: 'getBalance',
    params: [account]
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) : void => {
    setValue(event.currentTarget.value as string);
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> | undefined = (
    event: FormEvent,
  ) => {
    event.preventDefault();
    contractWeb3.deposit({value: stringToEther(value)})
  };

  const handleMaxClick = (
    event: MouseEvent,
  ) : void => {
    balance && setValue(formatBalance(balance));
  }; 

  const { openModal } = useModal(MODAL.connect);

  useEffect(() => {
    const matomoHomePageOpenedEvent: MatomoEventType = [
      'CollectifDAO',
      'Home page opened',
      'home_page_opened',
    ];

    trackEvent(...matomoHomePageOpenedEvent);
  }, []);

  return (
    <Layout>
      <Head>
        <title>Collective | Filecoin liquid staking protocol</title>
      </Head>
      <StackedBlock>
        <form action="" method="post" onSubmit={handleSubmit}>
          {active && <WalletSectionWrapper>
            <WalletWrapperStyles style={{color: '#0086ff'}}>
              <Wallet />
               {initialClFilLoading ? <WalledBalanceLoaderStyle /> :
              (<WalletBalanceStyles>
                <FormatToken amount={clFilBalance} symbol="clFIL" />
              </WalletBalanceStyles>)}
            </WalletWrapperStyles>
            <WalletWrapperStyles>
              <Wallet />
               {initialLoading ? <WalledBalanceLoaderStyle /> :
              (<WalletBalanceStyles>
                <FormatToken amount={balance} symbol="FIL" />
              </WalletBalanceStyles>)}
            </WalletWrapperStyles>
            <Button type="button" size="xs" onClick={handleMaxClick}>Max</Button>
          </WalletSectionWrapper>}
          <InputWrapper>
            <Input
              id="fil"
              fullwidth
              value={value}
              onChange={handleChange}
              placeholder="0"
              leftDecorator={
                <>
                  <Fil />
                  <DecoratorLabelStyle>Fil</DecoratorLabelStyle>
                </>
              }
              label="You stake"
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              id="clfil"
              fullwidth
              placeholder="0"
              value = {+value/STAKING_RATIO}
              leftDecorator={
                <>
                  <Clfil />
                  <DecoratorLabelStyle>clFIL</DecoratorLabelStyle>
                </>
              }
              label="You receive"
              variant="nopadding"
              readOnly
            />
          </InputWrapper>
          <ButtonWrapper>
            {active ? (
              <Button fullwidth type="submit">
              Submit
            </Button>
            ) : (
            <Button fullwidth type="button" onClick={openModal}>
              Connect Wallet
            </Button>
            )}
          </ButtonWrapper>
        </form>
      </StackedBlock>
      <ConnectionError />
    </Layout>
  );
}
