import { FC } from 'react';
import Link from 'next/link';
import { Logo } from '../logo';
import {
  HeaderStyle,
  HeaderLogoStyle,
  HeaderActionsStyle,
} from './headerStyles';
import HeaderWallet from './headerWallet';

const Header: FC = () => (
  <HeaderStyle size="full" forwardedAs="header">
    <HeaderLogoStyle>
      <Link href="/">
        <Logo />
      </Link>
    </HeaderLogoStyle>
    <HeaderActionsStyle>
      <HeaderWallet />
    </HeaderActionsStyle>
  </HeaderStyle>
);

export default Header;
