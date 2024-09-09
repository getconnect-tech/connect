import styled from 'styled-components';
import { Typography } from '@/styles/typography';

export const ItemDiv = styled.div`
  display: flex;
  border-bottom: 0.5px solid var(--border);
  padding: 8px 12px;
  gap: 16px;
  justify-content: space-between;
  position: relative;
  &:last-child {
    border-bottom: none;
  }
`;

export const InnerDiv = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  svg {
    fill: var(--icon);
  }
`;

export const Name = styled.div`
  ${Typography.body_md_medium}
  color: var(--text);
`;
