/* eslint-disable indent */
import styled from 'styled-components';
import { Typography } from '@/styles/typography';

interface Props {
  isActive?: boolean;
}

const StatusDiv = styled.div<Props>`
  padding: 2px 12px 2px 2px;
  background-color: var(--bg-surface-secondary);
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  &:hover {
    background-color: var(--bg-surface-secondary-hover);
    .icon {
      fill: var(--icon-hover);
    }
    p {
      color: var(--text);
    }
  }
  .icon {
    fill: var(${({ isActive }) => (isActive ? '--icon-hover' : '--icon')});
    margin: 4px 0 4px 10px;
  }
  p {
    color: var(
      ${({ isActive }) => (isActive ? '--text' : '--text-text-secondary')}
    );
  }
`;

const StatusTitle = styled.p`
  ${Typography.body_sm_regular}
  color: var(--text-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export { StatusDiv, StatusTitle };
