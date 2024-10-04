import styled from 'styled-components';
import { Typography } from '@/styles/typography';

export const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 80px;
  background-color: var(--bg-surface);
  height: 100vh;
  position: relative;
  .icon {
    position: fixed;
    top: 20px;
    right: 20px;
  }
  @media screen and (max-width: 449px) {
    padding: 46px 16px 0;
  }
`;

export const Content = styled.div`
  max-width: 790px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 48px;
  h6 {
    ${Typography.heading_heading_semibold}
    color: var(--text);
  }
  @media screen and (max-width: 449px) {
    gap: 32px;
  }
`;

export const Head = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
  align-items: center;
`;

export const OrganizationDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
`;

export const CardsDiv = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  @media screen and (max-width: 449px) {
    gap: 8px;
  }
`;
