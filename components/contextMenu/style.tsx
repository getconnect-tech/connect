import styled from 'styled-components';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { colors } from '@/styles/colors';
import { Typography } from '@/styles/typography';
const ContextMenuMainDiv = styled.div``;

const ContextMenuContent = styled(ContextMenu.Content)`
  background-color: ${colors.bg_white};
  box-shadow:
    0px 0px 0px 0.5px ${colors.box_shadow},
    0px 4px 8px 0px ${colors.box_shadow},
    0px 8px 24px 0px ${colors.box_shadow};
  border-radius: 12px;
  padding: 4px;
  z-index: 1;
  min-width: 180px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ContextMenuItem = styled(ContextMenu.Item)`
  ${Typography.body_md_regular};
  color: ${colors.text_text_secondary};
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &:hover {
    background-color: ${colors.bg_white_hover};
    border-radius: 6px;
    color: ${colors.text};
  }
`;

const ContextMenuSubTrigger = styled(ContextMenu.SubTrigger)`
  ${Typography.body_md_regular};
  color: ${colors.text_text_secondary};
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &:hover {
    background-color: ${colors.bg_white_hover};
    border-radius: 6px;
    color: ${colors.text};
  }
  /* display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px; */
  position: relative;
  &:hover {
    background-color: ${colors.bg_white_hover};
    border-radius: 6px;
    color: ${colors.text};
  }
`;

const ContextMenuSubContent = styled(ContextMenu.SubContent)`
  /* background-color: ${colors.bg_white};
  box-shadow:
    0px 0px 0px 0.5px ${colors.box_shadow},
    0px 4px 8px 0px ${colors.box_shadow},
    0px 8px 24px 0px ${colors.box_shadow}; */
  border-radius: 12px;
  padding: 4px;
  z-index: 2;
  min-width: 180px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 100%;
  margin-left: 2px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  &.submenu-upwards {
    bottom: calc(100% - 28px);
    top: auto;
  }

  &.submenu-downwards {
    top: 0;
    bottom: auto;
  }
`;

export {
  ContextMenuMainDiv,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
};
