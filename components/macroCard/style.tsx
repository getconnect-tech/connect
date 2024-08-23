import styled from 'styled-components';
import { Typography } from '@/styles/typography';
import { colors } from '@/styles/colors';

const CardMainDiv = styled.div`
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid ${colors.border};
  &:last-child {
    border-bottom: none;
  }
`;

const LeftDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TitleDiv = styled.div`
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
  div {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

const CompanyDiv = styled.div`
  display: flex;
  gap: 6px;
  p {
    ${Typography.body_md_regular};
    color: ${colors.text_text_secondary};
  }
`;

const DotIcon = styled.div`
  width: 3px;
  height: 3px;
  background-color: ${colors.text_text_secondary};
  border-radius: 50%;
`;

const CompanyNameDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px;
  p {
    ${Typography.body_sm_regular};
    color: ${colors.text_text_secondary};
    margin-right: 10px;
  }
  &:hover {
    background-color: ${colors.bg_white_hover};
    border-radius: 30px;
    cursor: pointer;
    p {
      color: ${colors.text};
    }
  }
`;

const RightDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  p {
    ${Typography.body_sm_regular};
    color: ${colors.text_text_secondary};
  }
`;

export {
  CardMainDiv,
  LeftDiv,
  TitleDiv,
  CompanyDiv,
  DotIcon,
  CompanyNameDiv,
  RightDiv,
};
