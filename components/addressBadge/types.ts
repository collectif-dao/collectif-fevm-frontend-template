import { IdenticonBadgeProps } from '../ui';
import { Component } from 'types';

export type AddressBadgeComponent = Component<
  'div',
  Omit<IdenticonBadgeProps, 'address' | 'as'> & { address?: string | null }
>;
