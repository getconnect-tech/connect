/* eslint-disable indent */
import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { Typography } from '@/styles/typography';

const CardDiv = styled.div`
  background-color: var(--bg-white);
  padding: 12px 12px 12px 8px;
  margin: 12px 0;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  gap: 12px;
  box-shadow:
    0px 0px 0px 0.5px var(--bg-surface-secondary-hover),
    0px 2px 4px 0px var(--bg-surface-active);
  &:hover {
    box-shadow:
      0px 0px 0px 0.5px var(--border-hover),
      0px 2px 4px 0px var(--bg-surface-active);
  }
  &:hover .tagDiv {
    display: flex;
  }
`;

const DotIcon = styled.div`
  position: absolute;
  width: 5px;
  height: 5px;
  background: ${colors.black};
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
    fill: ${colors.icon};

    &:hover {
      fill: ${colors.icon_hover};
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
};
