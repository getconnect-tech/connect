import styled from 'styled-components';
import { Typography } from '@/styles/typography';

export const DropBox = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px 16px;
  border: var(--border-secondary);
  border-radius: 20px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  ${Typography.body_md_medium}
  color: var(--text-text-secondary);
`;
