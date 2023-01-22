import styled from 'styled-components'

export const ModalExtraStyle = styled.div`
  margin-top: ${({ theme }) => -theme.borderRadiusesMap.xl}px;
  color: var(--collective-color-accentContrast);
  background: var(--collective-color-accent);
  padding: ${({ theme }) => theme.spaceMap.xxl}px;
  padding-top: ${({ theme }) =>
    theme.borderRadiusesMap.xl + theme.spaceMap.xxl}px;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: ${({ theme }) => theme.spaceMap.lg}px;
    padding-top: ${({ theme }) =>
      theme.borderRadiusesMap.xl + theme.spaceMap.lg}px;
  }
`
