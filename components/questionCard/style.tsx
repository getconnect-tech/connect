import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { Typography } from '@/styles/typography';

const MainDiv = styled.div`
  border-left: 1px solid ${colors.border};
  padding-left: 18px;
  margin-left: -23px;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  p {
    background-color: ${colors.bg_surface_secondary};
    padding: 6px 12px;
    ${Typography.body_md_regular};
    color: ${colors.text};
    border-radius: 8px;
  }
  span {
    ${Typography.body_md_regular};
    color: ${colors.text_text_secondary};
  }
`;

export { MainDiv, Div };
