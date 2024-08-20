import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { Typography } from '@/styles/typography';

export const MainDiv = styled.div`
  background-color: ${colors.bg_white};
  border-radius: 12px;
  box-shadow:
    0px 0px 0px 0.5px ${colors.box_shadow},
    0px 4px 8px 0px ${colors.box_shadow},
    0px 8px 24px 0px ${colors.box_shadow};
  position: absolute;
  margin-top: 4px;
  z-index: 2;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  max-width: 196px;
  max-height: 160px;
  overflow: auto;
  left: 102px;
`;

export const SearchDiv = styled.div`
  padding: 0 0 0 12px;
  border-bottom: 1px solid ${colors.border};
  position: sticky;
  top: 0;
  background: ${colors.bg_white};
  z-index: 2;
  .input {
    border: none;
    padding: 8px 12px;
    ${Typography.body_md_regular};
  }
`;

export const Icons = styled.div`
  display: flex;
  padding: 2px;
  flex-wrap: wrap;
`;
