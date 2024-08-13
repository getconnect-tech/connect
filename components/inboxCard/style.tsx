/* eslint-disable indent */
import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { Typography } from '@/styles/typography';

interface Props {
  isActive?: boolean;
}

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
  .submenu-upwards {
    bottom: calc(100% - 83px);
    top: auto;
  }

  .submenu-downwards {
    top: calc(100% - 12px);
    bottom: auto;
  }
`;

const StatusDiv = styled.div<Props>`
  padding: 2px 12px 2px 2px;
  background-color: ${colors.bg_surface_secondary};
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.bg_surface_secondary_hover};
    .icon {
      fill: ${colors.icon_hover};
    }
    p {
      color: ${colors.text};
    }
  }
  .icon {
    fill: ${({ isActive }) => (isActive ? colors.icon_hover : colors.icon)};
    margin: 4px 0 4px 10px;
  }
  p {
    color: ${({ isActive }) =>
      isActive ? colors.text : colors.text_text_secondary};
  }
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
  StatusDiv,
  StatusTitle,
};
