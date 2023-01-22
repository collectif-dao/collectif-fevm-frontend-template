import styled from 'styled-components';
import { Button, InlineLoader } from '../ui';

export const WalledButtonStyle = styled(Button)`
  flex-shrink: 1;
  min-width: unset;
  overflow: hidden;
  padding: 5px 5px 5px 20px;
  border-radius: 20px;
  background-color: #F0F0F0;
`;

export const WalledButtonWrapperStyle = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  // margin: -10px -18px;
`;

export const WalledButtonBalanceStyle = styled.span`
  margin-right: 12px;
  margin-left: 4px;
  font-size: ${({ theme }) => theme.fontSizesMap.xs}px;
  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`;

export const WalledButtonLoaderStyle = styled(InlineLoader)`
  width: 60px;
`;
