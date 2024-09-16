import styled from 'styled-components';
import { Typography } from '@/styles/typography';

export const MainDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: calc(100vh - 58px);
  max-width: 340px;
  gap: 16px;
  margin: auto;
  div {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-direction: column;
  }
  h6 {
    ${Typography.body_md_semibold};
    color: var(--text);
  }
  p {
    ${Typography.body_md_regular};
    color: var(--text-text-secondary);
    text-align: center;
  }
`;

export const IconDiv = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-white);
  border-radius: 50%;
  box-shadow: var(--shadow-card);
  svg {
    fill: var(--icon);
  }
`;
