import styled from 'styled-components';
import { Typography } from '@/styles/typography';

export const FileCardDiv = styled.div`
  width: 155px;
  height: 125px;
  box-shadow: var(--shadow-card);
  border-radius: 6px;
  position: relative;
  cursor: pointer;
  overflow: hidden;

  .overlay {
    background: linear-gradient(
      0deg,
      var(--brand) 23.65%,
      var(--overlay-color) 85%
    );
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 0;
    border-radius: 6px;
  }
  .download-icon {
    display: none;
  }
  &:hover {
    background: var(--bg-overlay-color);
    box-shadow: var(--shadow-card-hover);
    .download-icon {
      display: block;
      position: absolute;
      top: 8px;
      right: 8px;

      svg {
        fill: var(--white);
      }
      :hover {
        svg {
          fill: var(--text);
        }
      }
    }
    .overlay {
      display: none;
    }
  }
`;

export const TextPreviewDiv = styled.div`
  ${Typography.body_md_regular};
  color: var(--text);
  margin: 4px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  position: absolute;
  bottom: 8px;
  left: 8px;
  z-index: 1;
  .file-icon {
    display: flex;
  }
`;
export const FileName = styled.div`
  ${Typography.body_sm_medium};
  color: var(--text-white);
  max-width: 113px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const FileSize = styled.div`
  ${Typography.body_xs_regular};
  color: var(--text-disabled);
  display: none;

  ${FileCardDiv}:hover & {
    display: flex;
  }
`;

export const FileDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
`;

export const ImageDiv = styled.div`
  width: 155px;
  height: 125px;
  box-shadow: var(--shadow-card);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }
  .download-icon {
    display: none;
  }
  &:hover {
    background: var(--bg-overlay-color);
    box-shadow: var(--shadow-card-hover);
    img {
      opacity: 15%;
    }
    .download-icon {
      display: block;
      position: absolute;
      top: 8px;
      right: 8px;

      svg {
        fill: var(--white);
      }
      :hover {
        svg {
          fill: var(--text);
        }
      }
    }
  }
`;
