import {ComponentProps} from '../utils'

export enum HeadingColor {
  text,
  secondary,
}
export type HeadingColors = keyof typeof HeadingColor

export enum HeadingSize {
  sm,
  md,
  lg,
}
export type HeadingSizes = keyof typeof HeadingSize

export type HeadingProps = ComponentProps<
  'div',
  {
    color?: HeadingColors
    size?: HeadingSizes
  }
>

export type HProps<T extends 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> =
  ComponentProps<
    T,
    {
      color?: HeadingColors
    }
  >