import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { Typography } from '@/styles/typography';

export const CardDiv = styled.div`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.5px solid ${colors.border};
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
    color: ${colors.text};
  }
  p {
    ${Typography.body_md_regular};
    color: ${colors.text_text_secondary};
  }
`;

export const RightDiv = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  h6 {
    ${Typography.body_sm_regular};
    color: ${colors.text};
    padding: 4px 12px;
    background-color: ${colors.bg_surface_secondary};
    border-radius: 30px;
  }
`;
