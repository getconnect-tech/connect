import styled from 'styled-components';
import { Typography } from '@/styles/typography';

export const MainDiv = styled.div`
  display: flex;
  max-width: 360px;
  min-width: 360px;
  width: 100%;
  border-radius: 12px;
  background-color: var(--bg-white);
  gap: 12px;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border);
  ${Typography.body_md_semibold}
  color: var(--text);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  gap: 4px;
  h2 {
    ${Typography.body_md_medium}
    color: var(--text);
  }
  p {
    ${Typography.body_md_regular}
    color: var(--text-text-secondary);
  }
`;

export const BottomDiv = styled.div`
  display: flex;
  padding: 8px 16px 12px;
  gap: 8px;
  justify-content: end;
  align-items: center;
`;
