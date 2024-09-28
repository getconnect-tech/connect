/* eslint-disable indent */
import styled, { css } from 'styled-components';
import { Typography } from '@/styles/typography';

interface Props {
  isShowHoverItems: boolean;
}

const CardDiv = styled.div<Props>`
  background-color: var(--bg-white);
  padding: 12px 12px 12px 8px;
  margin: 12px 0;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  gap: 12px;
  box-shadow: var(--shadow-card);
  &:hover {
    box-shadow: var(--shadow-card-hover);
  }
  &:hover .tagDiv {
    display: flex;
  }

  ${(props) =>
    props.isShowHoverItems &&
    css`
      box-shadow: var(--shadow-card-hover);
      .tagDiv {
        display: flex;
      }
    `}
`;

const DotIcon = styled.div`
  position: absolute;
  width: 5px;
  height: 5px;
  background: var(--black);
  left: 12px;
  top: 23px;
  border-radius: 100%;
`;

const LeftDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding-left: 13px;
  div {
    display: flex;
    gap: 12px;
  }
`;

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 53px;
  margin-top: -4px;
  .description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    word-break: break-word;
  }
`;

const NameText = styled.div`
  ${Typography.body_md_regular};
  color: var(--text-text-secondary);
`;

const DesTitle = styled.div`
  ${Typography.body_md_medium};
  color: var(--text);
  word-wrap: break-word;
`;

const StatusMainDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
  padding-top: 4px;
  justify-content: space-between;
  .statusDiv {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    max-width: 530px;
    width: 100%;
  }
  .submenu-upwards {
    bottom: calc(100% - 83px);
    top: auto;
  }

  .submenu-downwards {
    /* top: calc(100% - 12px); */
    bottom: auto;
  }
`;

const TagDiv = styled.div`
  display: none;
  border-radius: 30px;
  background-color: var(--bg-surface-secondary);
  align-items: center;
  svg {
    fill: var(--icon);

    &:hover {
      fill: var(--icon-hover);
    }
  }
  .submenu-upwards {
    bottom: calc(100% - 84px);
    top: auto;
    position: absolute;
    background-color: var(--bg-white);
    box-shadow: var(--shadow-dropdown);
    border-radius: 12px;
  }

  .submenu-downwards {
    top: calc(100% - 12px);
    bottom: auto;
    position: absolute;
    background-color: var(--bg-white);
    box-shadow: var(--shadow-dropdown);
    border-radius: 12px;
  }
`;
const LineDiv = styled.div`
  width: 1px;
  height: 24px;
  background-color: var(--border-input_border);
`;
const StatusTitle = styled.p`
  ${Typography.body_sm_medium}
  color: var(--text-text-secondary);
`;

const InternalMessageDiv = styled.div`
  display: flex;
  gap: 4px;
`;

const Description = styled.div`
  display: flex;
  padding: 2px 8px;
  background-color: var(--bg-surface);
  border-radius: 30px;
  align-items: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  ${Typography.body_md_regular};
  color: var(--text-text-secondary);
  div {
    white-space: normal;
    p {
      span {
        br {
          display: none;
        }
      }
    }
  }
`;
export {
  DesTitle,
  NameText,
  RightDiv,
  LeftDiv,
  DotIcon,
  CardDiv,
  StatusMainDiv,
  StatusTitle,
  TagDiv,
  LineDiv,
  InternalMessageDiv,
  Description,
};
