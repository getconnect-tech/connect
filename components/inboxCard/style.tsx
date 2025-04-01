/* eslint-disable indent */
import styled, { css } from 'styled-components';
import { Typography } from '@/styles/typography';

interface Props {
  isShowHoverItems?: boolean;
  isShowNavbar?: boolean;
  isAwaiting?: boolean;
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
    @media screen and (max-width: 449px) {
      box-shadow: var(--shadow-card);
    }
  }
  &:hover .tagDiv {
    display: flex;
    @media screen and (max-width: 449px) {
      display: none;
    }
  }
  &:hover .awaiting-div {
    display: flex;
    @media screen and (max-width: 449px) {
      display: none;
    }
  }
  ${(props) =>
    props.isShowNavbar &&
    css`
      @media screen and (max-width: 449px) {
        min-width: 361px;
      }
    `}

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
  align-items: flex-start;
`;

const Div = styled.div<Props>`
  display: flex;
  gap: 12px;
  @media screen and (max-width: 449px) {
    ${(props) =>
      props.isAwaiting &&
      css`
        padding-bottom: 8px;
      `}
  }
`;

const LeftNameContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const RightContentDiv = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
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
    @media screen and (max-width: 449px) {
      -webkit-line-clamp: 2;
    }
  }
`;

const NameText = styled.div`
  ${Typography.body_md_regular};
  color: var(--text-text-secondary);
  &.time-text {
    display: flex;
    @media screen and (max-width: 449px) {
      display: none;
    }
  }
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
  position: relative;
  .statusDiv {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    max-width: 530px;
    width: 100%;
  }
  .submenu-upwards {
    bottom: calc(100% - 0px);
    top: auto;
  }

  .submenu-downwards {
    /* top: calc(100% - 12px); */
    bottom: auto;
  }
  @media screen and (max-width: 449px) {
    flex-direction: column;
    align-items: unset;
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
    bottom: calc(100% - 0px);
    top: auto;
    position: absolute;
    background-color: var(--bg-white);
    box-shadow: var(--shadow-dropdown);
    border-radius: 12px;
    @media screen and (max-width: 449px) {
      bottom: calc(100% + 4px);
    }
  }
  .date-picker-downwards {
    top: 4px;
  }
  .date-picker {
    bottom: calc(100% + 27px);
  }

  .submenu-downwards {
    /* top: calc(100% - 12px); */
    bottom: auto;
    position: absolute;
    background-color: var(--bg-white);
    box-shadow: var(--shadow-dropdown);
    border-radius: 12px;
  }
  @media screen and (max-width: 449px) {
    display: flex;
    &.tagDiv {
      display: none;
    }
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
  border-radius: 12px;
  align-items: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  ${Typography.body_md_regular};
  color: var(--text);
  @media screen and (max-width: 449px) {
    -webkit-line-clamp: 2;
  }
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

const ResponsiveTimeDiv = styled.div`
  display: none;
  @media screen and (max-width: 449px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
`;

const AwaitingDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  display: none;
`;

const AwaitingText = styled.p`
  ${Typography.body_md_regular};
  color: var(--text-text-secondary);
`;

const ResponsiveAwaitingDiv = styled.div`
  display: none;
  @media screen and (max-width: 449px) {
    display: flex;
    align-items: center;
    gap: 6px;
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
  ResponsiveTimeDiv,
  AwaitingDiv,
  AwaitingText,
  Div,
  RightContentDiv,
  ResponsiveAwaitingDiv,
  LeftNameContentDiv,
};
