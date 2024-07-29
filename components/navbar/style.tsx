import { colors } from "@/styles/colors";
import { Typography } from "@/styles/typography";
import styled from "styled-components";

interface Props {
  isActive?: boolean;
}

const MainDiv = styled.div`
  padding: 20px 16px;
  height: 100vh;
  background-color: ${colors.bg_surface};
  width: 223px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid ${colors.border};
  position: fixed;
`;

const TopDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo-icon {
    cursor: pointer;
    &:hover {
      background-color: ${colors.bg_surface_hover};
      border-radius: 30px;
    }
  }
`;

const ItemMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const ItemDiv = styled.div<Props>`
  display: flex;
  align-items: center;
  padding: 4px 4px 4px 12px;
  justify-content: space-between;
  cursor: pointer;
  background-color: ${({ isActive }) => isActive && colors.bg_surface_active};
  border-radius: ${({ isActive }) => isActive && "30px"};
  &:hover {
    background-color: ${colors.bg_surface_hover};
    border-radius: 30px;
  }
`;

const Title = styled.p<Props>`
  ${Typography.body_md_regular}
  color: ${({ isActive }) =>
    isActive ? colors.text : colors.text_text_secondary};
`;

const Label = styled.p`
  ${Typography.body_sm_medium}
  color: ${colors.text_text_secondary};
  padding: 0 12px;
`;

const CountText = styled.p`
  ${Typography.body_sm_regular}
  color: ${colors.text_text_secondary};
  background-color: ${colors.bg_surface_secondary};
  padding: 2px 8px;
  border-radius: 50%;
`;

const LeftDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export {
  MainDiv,
  LogoDiv,
  ItemDiv,
  Title,
  ItemMainDiv,
  Label,
  TopDiv,
  CountText,
  LeftDiv,
};
