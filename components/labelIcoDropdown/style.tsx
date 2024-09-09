import styled from 'styled-components';
import { Typography } from '@/styles/typography';

export const MainDiv = styled.div`
  background-color: var(--bg-white);
  border-radius: 12px;
  box-shadow: var(--shadow-dropdown);
  position: absolute;
  margin-top: 4px;
  z-index: 2;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  max-width: 288px;
  max-height: 216px;
  width: 100%;
  overflow: auto;
  left: 55px;
  top: 92px;
`;

export const SearchDiv = styled.div`
  padding: 0 0 0 12px;
  border-bottom: var(--border-main);
  position: sticky;
  top: 0;
  background: var(--bg-white);
  z-index: 2;
  .input {
    border: none;
    padding: 8px 12px;
    ${Typography.body_md_regular};
  }
`;

export const Icons = styled.div`
  display: flex;
  padding: 4px;
  flex-wrap: wrap;
  gap: 8px;
`;
