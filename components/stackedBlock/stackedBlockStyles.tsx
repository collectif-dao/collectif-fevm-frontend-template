import styled from 'styled-components';

export const StackedBlockStyles = styled.div`
  background-color: #fff;
  position: relative;
  padding: 30px 0;
  border-radius: 26px;
  border: 2px solid #191919;
  box-sizing: border-box;
  padding-bottom: 20px;

  &::before, &::after {
    content: '';
    display: block;
    position: absolute;
    background-color: #E6E6E6;
    border: 2px solid #191919;
    border-radius: 30px;
  }

  &::before {
    top: 12px;
    bottom: -12px;
    left: -12px;
    right: 12px;
    z-index: -1;
  }

  &::after {
    top: 22px;
    bottom: -22px;
    left: -22px;
    right: 22px;
    z-index: -2;
  }
`;
