/* eslint-disable indent */
import styled from 'styled-components';
import { Typography } from '@/styles/typography';

interface Props {
  isActive?: boolean;
  dropDownOpen?: boolean; // New prop to handle dropdown state
  hasIconTitlePairs?: boolean;
}

const StatusDiv = styled.div<Props>`
  background-color: var(--bg-surface-secondary);
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
    fill: var(--icon);
  }

  &:hover {
    background-color: var(--bg-surface-secondary-hover);
    .icon {
      fill: var(--icon-hover);
    }
    p {
      color: var(--text);
    }
    .line {
      background-color: var(--border-hover);
    }
    .tag-icon {
      fill: var(--icon-hover);
    }
  }

  .icon {
    fill: var(${({ isActive }) => (isActive ? '--icon-hover' : '--icon')});
    margin: 4px 0 4px;
    &:first-child {
      margin: 4px 0 4px 10px;
    }
  }

  p {
    color: var(
      ${({ isActive }) => (isActive ? '--text' : '--text-text-secondary')}
    );
  }

  .line {
    width: 1px;
    background-color: var(--border-input_border);
    height: 24px;
    margin: 0 2px;
    &:last-child {
      display: none;
    }
  }
`;

const StatusTitle = styled.p`
  ${Typography.body_sm_regular}
  color: var(--text-text-secondary);
`;

export { StatusDiv, StatusTitle };
