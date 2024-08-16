import styled from 'styled-components';
import { colors } from '@/styles/colors';
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
    color: ${colors.text};
  }
  p {
    ${Typography.body_md_regular};
    color: ${colors.text_text_secondary};
    text-align: center;
  }
`;

export const IconDiv = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.bg_white};
  border-radius: 50%;
  box-shadow:
    0px 0px 0px 0.5px ${colors.box_shadow},
    0px 2px 4px 0px ${colors.box_shadow_2};
  svg {
    fill: ${colors.icon};
  }
`;
