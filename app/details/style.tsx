import { colors } from "@/styles/colors";
import styled, { css } from "styled-components";
import { Typography } from "../../styles/typography";

const Main = styled.div`
  display: flex;
  background-color: ${colors.bg_surface};
  height: 100vh;
`;

const TopDiv = styled.div`
  position: sticky;
  top: 0;
  background-color: ${colors.bg_surface};
  z-index: 999;
  padding: 9px 20px;
  border-bottom: 1px solid ${colors.border};
`;

const BottomDiv = styled.div``;

const MainDiv = styled.div`
  width: 100%;
  margin-left: 223px;
  height: 100vh;
  overflow: auto;
  border-right: 1px solid ${colors.border};
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
`;

const LeftDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const IconDiv = styled.div`
  width: 24px;
  height: 24px;
  fill: ${colors.icon};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    fill: ${colors.icon_hover};
    background-color: ${colors.bg_surface_hover};
    border-radius: 100%;
  }
`;

const Title = styled.div`
  ${Typography.body_md_medium}
  color: ${colors.text};
`;

const StatusDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export {
  Main,
  MainDiv,
  HeaderDiv,
  Title,
  TopDiv,
  BottomDiv,
  LeftDiv,
  IconDiv,
  StatusDiv,
};
