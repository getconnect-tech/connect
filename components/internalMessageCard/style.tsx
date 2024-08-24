import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { Typography } from '@/styles/typography';

const MainDiv = styled.div`
  border-left: 1px solid ${colors.border};
  padding-left: 22px;
  margin-left: -22px;
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
    word-wrap: break-word;
    max-width: 536px;
    div {
      p {
        padding: 0;
        span {
          white-space: inherit;
          color: ${colors.text};
        }
        br {
          display: none;
        }
      }
    }
  }
  span {
    ${Typography.body_md_regular};
    color: ${colors.text_text_secondary};
    white-space: nowrap;
  }
`;

export { MainDiv, Div };
