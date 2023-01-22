import styled, { css } from 'styled-components'
import { LinkProps } from './types'

export const LinkStyle = styled.a`
  text-decoration: none;
  color: var(--collective-color-link);
  :hover {
    color: var(--collective-color-linkHover);
  }
  ${(props: LinkProps) =>
    props.fadeVisited &&
    css`
      :visited {
        color: var(--collective-color-linkVisited);
      }
    `}
`