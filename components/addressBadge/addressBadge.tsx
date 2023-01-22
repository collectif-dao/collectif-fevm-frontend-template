import { useBreakpoint } from '../ui';
import { AddressBadgeStyle } from './addressBadgeStyles';
import { AddressBadgeComponent } from './types';
import { Wallet, Address } from '../ui';
import { AddressWrapperStyle } from './addressBadgeStyles';

const AddressBadge: AddressBadgeComponent = (props: any) => {
  const { address, ...rest } = props;
  const isMobile = useBreakpoint('md');

  return (
    <AddressBadgeStyle>
      <Wallet />
      <AddressWrapperStyle>
        <Address symbols={isMobile ? 3 : 6} address={address ?? ''} {...rest} />
      </AddressWrapperStyle>
    </AddressBadgeStyle>
  );
};

export default AddressBadge;
