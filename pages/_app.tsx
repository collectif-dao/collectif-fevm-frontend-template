import { memo } from 'react';
import NextApp, { AppContext, AppProps } from 'next/app';
import {
  ToastContainer,
} from '../components/ui';
import Providers from 'providers';
import { CustomAppProps } from 'types';
import { withCsp } from 'utils/withCsp';


const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;

  return <Component {...pageProps} />;
};

const MemoApp = memo(App);

const AppWrapper = (props: CustomAppProps): JSX.Element => {
  const { ...rest } = props;

  return (
    <Providers>
      <MemoApp {...rest} />
      <ToastContainer />
    </Providers>
  );
};

AppWrapper.getInitialProps = async (appContext: AppContext) => {
  return await NextApp.getInitialProps(appContext);
};

// export default AppWrapper;

export default process.env.NODE_ENV === 'development'
  ? AppWrapper
  : withCsp(AppWrapper);
