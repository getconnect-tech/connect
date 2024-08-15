import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { Typography } from '@/styles/typography';

export const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 80px;
  background-color: ${colors.bg_surface};
  height: 100vh;
  position: relative;
  .icon {
    position: fixed;
    top: 20px;
    right: 20px;
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
    color: ${colors.text};
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
`;
