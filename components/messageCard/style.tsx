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
  white-space: nowrap;
  &:hover {
    cursor: pointer;
    color: var(--text);
  }
  .submenu-upwards {
    bottom: calc(100% - 20px);
    top: auto;
  }

  .submenu-downwards {
    bottom: auto;
    margin-top: 7px;
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
      span {
        white-space: normal;
        color: var(--text);
      }
    }
    ul {
      margin-left: 18px;
    }
    ol {
      margin-left: 20px;
    }
    hr {
      border-bottom: var(--border-main) !important;
      border: none;
      margin-bottom: 5px;
      margin-top: 10px;
    }
  }
`;

const MessageCardMainDiv = styled.div`
  padding-left: 22px;
  margin-left: 10px;
  width: 100%;
  z-index: 1;
  @media screen and (max-width: 449px) {
    padding-left: unset;
    margin-left: unset;
  }
`;

const NameDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  span {
    ${Typography.body_md_regular}
    color: var(--text-text-secondary);
  }
  .avtar-message {
    display: none;
    @media screen and (max-width: 449px) {
      display: flex;
    }
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

const AttachmentMainDiv = styled.div`
  border-top: var(--border-main);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  ${Typography.body_md_medium};
  color: var(--text);
`;

const DownloadButton = styled.div`
  ${Typography.body_md_medium};
  color: var(--text);
  cursor: pointer;
`;

const FileCardMainDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
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
  AttachmentMainDiv,
  TitleDiv,
  Title,
  DownloadButton,
  FileCardMainDiv,
};
