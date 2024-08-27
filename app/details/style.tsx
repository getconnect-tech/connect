/* eslint-disable indent */
import styled from 'styled-components';
import { Typography } from '../../styles/typography';
import { colors } from '@/styles/colors';
import { DropDownItem } from '@/components/dropDown/dropDown';

interface Props {
  modeSelectedItem?: DropDownItem;
  isMargin?: boolean;
}

const Main = styled.div`
  display: flex;
  background-color: ${colors.bg_surface};
  height: 100vh;
`;

const TopDiv = styled.div`
  position: sticky;
  top: 0;
  background-color: ${colors.bg_surface};
  z-index: 99;
  border-bottom: 1px solid ${colors.border};
`;

const BottomDiv = styled.div`
  max-width: 702px;
  width: 100%;
  margin: 0 auto;
  height: calc(100dvh - 208px);
  overflow: auto;
`;

const MainDiv = styled.div`
  width: 100%;
  margin-left: 223px;
  overflow: auto;
  border-right: 1px solid ${colors.border};
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
  padding: 7px 20px;
`;

const LeftDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Title = styled.div`
  ${Typography.body_md_medium}
  color: ${colors.text};
`;

const StatusDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  padding: 9px 20px;
  border-top: 1px solid ${colors.border};
  position: relative;
`;

const ButtonDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  .submenu-upwards {
    bottom: calc(100% - 50px);
    top: auto;
  }
  .submenu-downwards {
    top: 33px;
    bottom: auto;
    right: 20px;
  }
`;

const InputDiv = styled.div`
  position: sticky;
  bottom: 0;
  background-color: ${colors.bg_surface};
  z-index: 1;
  max-width: 702px;
  margin: 0 auto;
  padding: 0 0 20px;
  .input-main-div {
    display: flex;
    gap: 12px;
  }
  .line {
    height: 20px;
    border-left: 1px solid ${colors.border};
    margin-left: 10px;
  }
  .avtar {
    position: absolute;
    top: 18px;
    z-index: 1;
  }
`;

const Input = styled.div<Props>`
  background-color: ${({ modeSelectedItem }) =>
    modeSelectedItem?.name === 'Internal'
      ? colors.brand_disabled
      : colors.bg_white};
  border-radius: 12px;
  width: 100%;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  box-shadow:
    0px 0px 0px 0.5px ${colors.box_shadow},
    0px 2px 4px 0px ${colors.box_shadow_2};
  margin-left: 11px;
  margin-top: 8px;
`;

const CenterDiv = styled.div`
  padding: 20px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

const InputIcon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  .send-icon {
    background-color: ${colors.bg_surface_secondary};
    border-radius: 50%;
    &:hover {
      background-color: ${colors.bg_surface_secondary_hover};
    }
  }
  .submenu-upwards {
    bottom: 60px;
    top: auto;
  }
  .submenu-downwards {
    top: 0;
    bottom: auto;
  }
`;

const ActivityDiv = styled.div`
  display: flex;
  gap: 12px;
  position: relative;
  .avtar {
    position: absolute;
    top: 12px;
    z-index: 1;
  }
  .avtar-internal {
    position: absolute;
    top: 6px;
    z-index: 1;
  }
`;

const Message = styled.p`
  ${Typography.body_md_regular};
  color: ${colors.text};
  border-left: 1px solid ${colors.border};
  padding-left: 22px;
  margin-left: -22px;
  span {
    ${Typography.body_md_regular};
    color: ${colors.text_text_secondary};
  }
  svg {
    margin: 0 8px 3px;
  }
`;

const LineDiv = styled.div`
  border-left: 1px solid ${colors.border};
  height: 20px;
  margin-left: 10px;
`;

const IconDiv = styled.div<Props>`
  display: flex;
  align-items: center;
  gap: 8px;
  .icon {
    background-color: ${({ modeSelectedItem }) =>
      modeSelectedItem?.name === 'Internal'
        ? colors.bg_surface_secondary_hover
        : colors.bg_surface_secondary};
  }
`;

export {
  Main,
  MainDiv,
  HeaderDiv,
  Title,
  TopDiv,
  BottomDiv,
  LeftDiv,
  StatusDiv,
  InputDiv,
  Input,
  InputIcon,
  CenterDiv,
  ActivityDiv,
  Message,
  LineDiv,
  IconDiv,
  ButtonDiv,
};
