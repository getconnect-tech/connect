/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable indent */
import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { Typography } from '@/styles/typography';

interface Props {
  isSelected?: boolean;
  isHovered?: boolean;
  isContextMenu?: boolean;
}

const MainDiv = styled.div<Props>`
  background-color: ${colors.bg_white};
  border-radius: 12px;
  box-shadow:
    0px 0px 0px 0.5px ${colors.box_shadow},
    0px 4px 8px 0px ${colors.box_shadow},
    0px 8px 24px 0px ${colors.box_shadow};
  position: ${({ isContextMenu }) => (isContextMenu ? 'relative' : 'absolute')};
  margin-top: 4px;
  z-index: 1;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
`;

const ItemDiv = styled.div<Props>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 8px;
  cursor: pointer;
  p {
    ${Typography.body_md_regular};
    color: ${({ isSelected, isHovered }) =>
      isSelected
        ? colors.text
        : isHovered
          ? colors.text
          : colors.text_text_secondary};
  }
  svg {
    fill: ${({ isSelected, isHovered }) =>
      isSelected
        ? colors.icon_active
        : isHovered
          ? colors.icon_active
          : colors.icon};
  }
  &:hover {
    background-color: ${colors.bg_white_hover};
    border-radius: 8px;
  }
`;
const SearchDiv = styled.div`
  padding: 0 0 0 12px;
  border-bottom: 1px solid ${colors.border};
`;

const ItemMainDiv = styled.div`
  margin: 4px;
`;

const checkmarkSVG = `
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.20006 8.67037C3.19946 8.67037 3.19886 8.67037 3.19766 8.67037C3.03746 8.66977 2.88506 8.60559 2.77286 8.49159L0.372863 6.05438C0.140063 5.81798 0.143064 5.43818 0.379464 5.20598C0.615864 4.97378 0.99506 4.97617 1.22786 5.21257L3.20366 7.21897L8.77647 1.64678C9.01107 1.41218 9.39026 1.41218 9.62486 1.64678C9.85946 1.88078 9.85946 2.26118 9.62486 2.49518L3.62486 8.49518C3.51206 8.60738 3.35906 8.67037 3.20006 8.67037Z" fill="white"/>
  </svg>
`;

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 16px;
  height: 16px;
  background-color: ${colors.bg_white};
  border: 1px solid ${colors.border_input_border};
  border-radius: 4px;
  display: inline-block;
  position: relative;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: ${colors.brand};
    background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(checkmarkSVG)}');
    background-size: 10px 10px;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export { MainDiv, ItemDiv, SearchDiv, ItemMainDiv, StyledCheckbox };
