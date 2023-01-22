import { ComponentProps } from '../utils';

export type AddressProps = ComponentProps<
  'div',
  {
    address: string;
    symbols?: number;
  }
>;
