import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { Typography } from '@/styles/typography';

const MessageCardInnerDiv = styled.div`
  background-color: ${colors.bg_white};
  border: 1px solid ${colors.border};
  border-radius: 12px;
  word-break: break-word;
`;

const CardTop = styled.div`
  padding: 12px 12px 8px;
  border-bottom: 1px solid ${colors.border};
  p {
    ${Typography.body_md_regular};
    color: ${colors.text_text_secondary};
    margin-top: 4px;
  }
`;

const CardMessage = styled.p`
  padding: 12px;
  ${Typography.body_md_regular};
  color: ${colors.text};
`;

const MessageCardMinDiv = styled.div`
  border-left: 1px solid ${colors.border};
  padding-left: 18px;
  margin-left: -23px;
`;

const NameDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  span {
    ${Typography.body_md_regular}
    color: ${colors.text_text_secondary};
  }
`;

const NameTitle = styled.h6`
  ${Typography.body_md_regular}
  color: ${colors.text};
`;

export {
  MessageCardInnerDiv,
  CardTop,
  CardMessage,
  MessageCardMinDiv,
  NameDiv,
  NameTitle,
};
