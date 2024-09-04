/* eslint-disable indent */
import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { Typography } from '@/styles/typography';

interface Props {
  isActive?: boolean;
  dropDownOpen?: boolean; // New prop to handle dropdown state
  hasIconTitlePairs?: boolean;
}

const StatusDiv = styled.div<Props>`
  background-color: ${colors.bg_surface_secondary};
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  height: 24px;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  padding: ${({ hasIconTitlePairs }) =>
    hasIconTitlePairs ? '0 12px 0 0' : '6px'};
  .tag-icon {
    fill: ${colors.icon};
  }

  &:hover {
    background-color: ${colors.bg_surface_secondary_hover};
    .icon {
      fill: ${colors.icon_hover};
    }
    p {
      color: ${colors.text};
    }
    .line {
      background-color: ${colors.border_hover};
    }
    .tag-icon {
      fill: ${colors.icon_hover};
    }
  }

  .icon {
    fill: ${({ isActive }) => (isActive ? colors.icon_hover : colors.icon)};
    margin: 4px 0 4px;
    &:first-child {
      margin: 4px 0 4px 10px;
    }
  }

  p {
    color: ${({ isActive }) =>
      isActive ? colors.text : colors.text_text_secondary};
  }

  .line {
    width: 1px;
    background-color: ${colors.border_input_border};
    height: 24px;
    margin: 0 2px;
    &:last-child {
      display: none;
    }
  }
`;

const StatusTitle = styled.p`
  ${Typography.body_sm_regular}
  color: ${colors.text_text_secondary};
`;

export { StatusDiv, StatusTitle };
