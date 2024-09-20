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
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
  margin-bottom: 6px;
`;

const FileCardMainDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export { MainDiv, Div, AttachmentMainDiv, FileCardMainDiv };
