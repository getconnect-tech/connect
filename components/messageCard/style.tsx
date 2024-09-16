import styled from 'styled-components';
import { Typography } from '@/styles/typography';

const MessageCardInnerDiv = styled.div`
  background-color: var(--bg-white);
  border: var(--border-main);
  border-radius: 12px;
  word-break: break-word;
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 12px 8px;
  border-bottom: var(--border-main);
  p {
    ${Typography.body_md_regular};
    color: var(--text-text-secondary);
  }
`;

const TagDiv = styled.div`
  padding: 4px 12px;
  ${Typography.body_sm_regular}
  color: var(--text-text-secondary);
  background-color: var(--bg-surface-secondary);
  border-radius: 30px;
  &:hover {
    cursor: pointer;
    color: var(--text);
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
    white-space: normal;
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
  hr {
    border-bottom: var(--border-main) !important;
    border: none;
    margin-bottom: 5px;
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

const CardHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export {
  MessageCardInnerDiv,
  CardTop,
  CardMessage,
  MessageCardMainDiv,
  NameDiv,
  NameTitle,
  TagDiv,
  CardHead,
};
