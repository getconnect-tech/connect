import styled from 'styled-components';
import { Typography } from '@/styles/typography';

const MainDiv = styled.div`
  padding-left: 22px;
  margin-left: 10px;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  p {
    background-color: var(--bg-surface-secondary);
    padding: 6px 12px;
    ${Typography.body_md_regular};
    color: var(--text);
    border-radius: 8px;
    word-wrap: break-word;
    max-width: 536px;
    div {
      white-space: normal;
      p {
        padding: 0;
        span {
          white-space: inherit;
          color: var(--text);
        }
        br {
          display: none;
        }
      }
    }
  }
  span {
    ${Typography.body_md_regular};
    color: var(--text-text-secondary);
    white-space: nowrap;
  }
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
  MainDiv,
  Div,
  AttachmentMainDiv,
  TitleDiv,
  Title,
  DownloadButton,
  FileCardMainDiv,
};
