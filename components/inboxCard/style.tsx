/* eslint-disable indent */
import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { Typography } from '@/styles/typography';

const CardDiv = styled.div`
  background-color: ${colors.bg_white};
  padding: 12px 12px 12px 8px;
  margin: 12px 0;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  gap: 12px;
  box-shadow:
    0px 0px 0px 0.5px ${colors.bg_surface_secondary_hover},
    0px 2px 4px 0px ${colors.bg_surface_active};
  &:hover {
    box-shadow:
      0px 0px 0px 0.5px ${colors.border_hover},
      0px 2px 4px 0px ${colors.bg_surface_active};
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
  color: ${colors.text_text_secondary};
`;

const DesTitle = styled.div`
  ${Typography.body_md_medium};
  color: ${colors.text};
  word-wrap: break-word;
`;

const StatusMainDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding-top: 4px;
  justify-content: space-between;
  .statusDiv {
    display: flex;
    gap: 8px;
  }
  .submenu-upwards {
    bottom: calc(100% - 83px);
    top: auto;
  }

  .submenu-downwards {
    top: calc(100% - 12px);
    bottom: auto;
  }
`;

const TagDiv = styled.div`
  display: none;
  width: 52px;
  border-radius: 30px;
  background-color: ${colors.bg_surface_secondary};
  gap: 6px;
  padding: 0px 8px;
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
  background-color: ${colors.border_input_border};
`;
const StatusTitle = styled.p`
  ${Typography.body_sm_medium}
  color: ${colors.text_text_secondary};
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
