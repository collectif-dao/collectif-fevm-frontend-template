import { ComponentProps } from '../utils';
export type { Theme } from '../theme';

export enum ContainerSize {
  full,
  content,
  tight,
}
export type ContainerSizes = keyof typeof ContainerSize;

export type ContainerProps = ComponentProps<
  'div',
  {
    size?: ContainerSizes;
  }
>;
