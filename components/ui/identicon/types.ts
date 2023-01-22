import { ComponentProps } from '../utils';
import React from 'react';
export type { Theme } from '../theme';

export type IdenticonProps = ComponentProps<
  'div',
  {
    address: string;
    diameter?: number;
    paperStyles?: React.CSSProperties;
    svgStyles?: React.CSSProperties;
  }
>;

export enum IdenticonBadgeColor {
  background,
  accent,
}
export type IdenticonBadgeColors = keyof typeof IdenticonBadgeColor;

export type IdenticonBadgeProps = {
  symbols?: number;
  color?: IdenticonBadgeColors;
} & IdenticonProps;
