import styled, { css } from 'styled-components'
import { InputMessageVariants, InputVariants, InputColors } from './types'

const statesCSS = css`
  &:hover {
    z-index: 1;
  }

  &:focus-within {
    z-index: 2;
    border-color: var(--collective-color-borderActive);
  }
`

const activeCSS = css`
  &,
  &:hover,
  &:focus-within {
    z-index: 2;
    border-color: var(--collective-color-borderActive);
  }
`

const errorCSS = css`
  &,
  &:hover,
  &:focus-within {
    border-color: var(--collective-color-error);
  }
`

const warningCSS = css`
  &,
  &:hover,
  &:focus-within {
    border-color: var(--collective-color-warning);
  }
`

const wrapperColors = {
  default: css<{ $disabled: boolean, $readonly: boolean }>`
    background: var(--collective-color-controlBg);
    border-color: var(--collective-color-border);
    color: var(--collective-color-text);

    ${({ $disabled, $readonly }) =>
      $disabled
        ? `background: var(--collective-color-foreground);`
        : $readonly ? `background: var(--collective-color-foreground);`:`
          border-top: 2px solid var(--collective-color-border);
          &:hover {
            border-color: var(--collective-color-borderHover);
          }
    `};
  `,
  accent: css<{ $disabled: boolean }>`
    background: var(--collective-color-accentControlBg);
    border-color: var(--collective-color-accentBorder);
    color: var(--collective-color-accentText);

    ${({ $disabled }) =>
      $disabled
        ? `background: var(--collective-color-controlBg);`
        : `
          &:hover {
            border-color: var(--collective-color-accentBorderHover);
          }
    `};
  `,
}

export const InputWrapperStyle = styled.div<{
  $error: boolean
  $warning: boolean
  $active: boolean
  $disabled: boolean
  $fullwidth: boolean
  $readonly: boolean
  $color: InputColors
}>`
  position: relative;
  display: inline-flex;
  align-items: stretch;
  box-sizing: border-box;
  padding: 0 30px;
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'text')};
  transition: border-color ${({ theme }) => theme.duration.fast} ease;
  width: ${({ $fullwidth }) => ($fullwidth ? '100%' : 'auto')};

  ${({ $color }) => wrapperColors[$color]};
  ${({ $disabled, $readonly }) => ($disabled || $readonly ? '' : statesCSS)}

  ${({ $active }) => ($active ? activeCSS : '')}
  ${({ $warning }) => ($warning ? warningCSS : '')}
  ${({ $error }) => ($error ? errorCSS : '')}
`

const contentVariants = {
  default: css`
    padding: 20px 0;
  `,
  small: css`
    padding: 9px 0;
  `,
  nopadding: css `
    padding: 0;
  `,
}

export const InputContentStyle = styled.span<{ $variant: InputVariants }>`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizesMap.xs}px;
  display: flex;
  flex-grow: 1;
  position: relative;

  ${({ $variant }) => contentVariants[$variant]};
`

const inputColors = {
  default: css`
    color: var(--collective-color-text);

    &:disabled {
      color: var(--collective-color-textSecondary);
    }

    &::placeholder {
      color: var(--collective-color-textSecondary);
    }

    &:-webkit-autofill {
      box-shadow: 0 0 0 100px var(--collective-color-controlBg) inset !important;
      color: var(--collective-color-text) !important;
    }

    &:-internal-autofill-selected {
      color: var(--collective-color-text) !important;
    }
  `,
  accent: css`
    color: var(--collective-color-accentText);
    opacity: 1;

    &:disabled {
      color: var(--collective-color-accentText);
      opacity: 0.5;
    }

    &::placeholder {
      color: var(--collective-color-accentText);
      opacity: 0.5;
    }

    &:-webkit-autofill {
      box-shadow: 0 0 0 100px var(--collective-color-accentControlBg) inset !important;
      color: var(--collective-color-accentContrast) !important;
    }

    &:-internal-autofill-selected {
      color: var(--collective-color-accentContrast) !important;
    }
  `,
}

export const InputStyle = styled.input<{
  $color: InputColors
}>`
  width: 100%;
  font-family: inherit;
  font-weight: 400;
  font-size: 30px;
  line-height: 38px;
  padding: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  border: none;
  outline: none;
  position: relative;
  text-align: right;

  &::placeholder {
    transition: opacity ${({ theme }) => theme.duration.fast} ease;
  }

  ${({ $color }) => inputColors[$color]}
`

export const TextareaStyle = styled(InputStyle).attrs({
  as: 'textarea',
})`
  resize: none;
`

const messageVariants = {
  error: css`
    background: var(--collective-color-error);
    color: var(--collective-color-errorContrast);
    box-shadow: ${({ theme }) => theme.boxShadows.sm}
      var(--collective-color-shadowLight);
  `,
  warning: css`
    background: var(--collective-color-warning);
    color: var(--collective-color-warningContrast);
    box-shadow: ${({ theme }) => theme.boxShadows.sm}
      var(--collective-color-shadowLight);
  `,
  success: css`
    color: var(--collective-color-success);
  `,
}

export const InputMessageStyle = styled.span<{
  $variant: InputMessageVariants
  $bordered?: boolean
}>`
  margin-top: ${({ $bordered }) => ($bordered ? 5 : 6)}px;
  left: ${({ $bordered }) => ($bordered ? -1 : 0)}px;
  position: absolute;
  top: 100%;
  line-height: 1.6em;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizesMap.xxs}px;
  border-radius: ${({ theme }) => theme.borderRadiusesMap.sm}px;
  padding: 6px 10px;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
  text-overflow: ellipsis;
  max-width: ${({ $bordered }) => ($bordered ? 'calc(100% + 2px)' : '100%')};

  ${({ $variant }) => messageVariants[$variant]}
`

const decoratorCSS = css`
  flex-grow: 0;
  flex-shrink: 0;
  cursor: inherit;
  display: flex;
  align-items: center;
`

export const InputLeftDecoratorStyle = styled.span`
  ${decoratorCSS}
  padding-right: 16px;
`

export const InputRightDecoratorStyle = styled.span`
  ${decoratorCSS}
  padding-left: 16px;
`
