import styled from 'styled-components';
import { Typography } from '@/styles/typography';

const MessageCardInnerDiv = styled.div`
  background-color: var(--bg-white);
  border: 1px solid var(--border);
  border-radius: 12px;
  word-break: break-word;
`;

const CardTop = styled.div`
  padding: 12px 12px 8px;
  border-bottom: 1px solid var(--border);
  p {
    ${Typography.body_md_regular};
    color: var(--text-text-secondary);
    margin-top: 4px;
  }
`;

const CardMessage = styled.p`
  padding: 12px;
  ${Typography.body_md_regular};
  color: var(--text);
  div {
    font-size: 14px !important;
    color: var(--text) !important;
    font-family: unset !important;
    p {
      br {
        display: none;
      }
    }
    ul {
      margin-left: 18px;
    }
    ol {
      margin-left: 20px;
    }
  }
`;

const MessageCardMainDiv = styled.div`
  padding-left: 22px;
  margin-left: 10px;
  width: 100%;
`;

const NameDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  span {
    ${Typography.body_md_regular}
    color: var(--text-text-secondary);
  }
`;

const NameTitle = styled.h6`
  ${Typography.body_md_regular}
  color: var(--text);
`;

export {
  MessageCardInnerDiv,
  CardTop,
  CardMessage,
  MessageCardMainDiv,
  NameDiv,
  NameTitle,
};
