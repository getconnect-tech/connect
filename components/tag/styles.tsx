import { colors } from "@/styles/colors";
import { Typography } from "@/styles/typography";
import styled from "styled-components";

interface Props {
  isActive?: boolean;
}

const StatusDiv = styled.div<Props>`
  padding: 2px 12px 2px 2px;
  background-color: ${colors.bg_surface_secondary};
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
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
  ${Typography.body_sm_regular}
  color: ${colors.text_text_secondary};
`;

export { StatusDiv, StatusTitle };