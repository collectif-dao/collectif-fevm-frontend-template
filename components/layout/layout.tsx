import { FC, PropsWithChildren } from 'react';
import Header from 'components/header';
import Main from 'components/main';
// import Footer from 'components/footer';

const Layout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <>
      <Header />
      <Main>
        {children}
      </Main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
