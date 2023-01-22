import styled from 'styled-components'

import { Button } from '../button'

export const ModalButtonStyle = styled(Button)`
  border: ${({ active }) =>
    active
      ? `1px solid var(--collective-color-primary)`
      : `1px solid var(--collective-color-background)`};

  background-color: ${({ active }) =>
    active ? 'rgba(0, 163, 255, 0.1);' : `var(--collective-color-background)`};

  color: var(--collective-color-text);

  :not(:disabled):hover,
  :focus-visible {
    background-color: rgba(0, 163, 255, 0.1);
    color: var(--collective-color-text);
  }
`

export const ModalButtonContentStyle = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
