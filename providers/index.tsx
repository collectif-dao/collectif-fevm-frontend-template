import { FC, PropsWithChildren } from 'react';
// import { CookieThemeProvider as ThemeProvider } from '../components/ui/theme';
import { ThemeProvider } from '../components/ui/theme';

import { GlobalStyle } from 'styles';

import ModalProvider from './modals';
import Web3Provider from './web3';
export { MODAL, ModalContext } from './modals';
import { themeLight } from 'themes';

export * from './web3';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={themeLight}>
      <GlobalStyle />
      <Web3Provider>
        <ModalProvider>{children}</ModalProvider>
      </Web3Provider>
    </ThemeProvider>
  );
};

export default Providers;
