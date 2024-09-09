import styled from 'styled-components';
import { Typography } from '@/styles/typography';

export const CardDiv = styled.div`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: var(--border-light);
  &:last-child {
    border-bottom: none;
  }
`;

export const LeftDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const NameDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  h6 {
    ${Typography.body_md_medium};
    color: var(--text);
  }
  p {
    ${Typography.body_md_regular};
    color: var(--text-text-secondary);
  }
`;

export const RightDiv = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  h6 {
    ${Typography.body_sm_regular};
    color: var(--text);
    padding: 4px 12px;
    background-color: var(--bg-surface-secondary);
    border-radius: 30px;
  }
`;
