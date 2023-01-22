import styled, { css } from 'styled-components'
import { InputColors } from './types'

const colors = {
  default: css`
    color: var(--collective-color-textSecondary);
  `,
  accent: css`
    color: var(--collective-color-accentContrastSecondary);
  `,
}

export const labelCSS = css<{ $color: InputColors }>`
  ${({ $color }) => colors[$color]}
`

export const InputLabelStyle = styled.label`
  display: block;
  padding-left: 30px;
  text-transform: uppercase;
  margin-bottom: 15px;
  display: block;
  font-size: 12px;
  ${labelCSS};
`

export const TextareaLabelStyle = styled(InputLabelStyle)`
  top: 27px;
`
