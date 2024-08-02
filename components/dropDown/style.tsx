import { colors } from "@/styles/colors";
import { Typography } from "@/styles/typography";
import styled from "styled-components";

const MainDiv = styled.div`
  background-color: ${colors.bg_white};
  padding: 4px;
  border-radius: 12px;
  box-shadow: 0px 0px 0px 0.5px ${colors.box_shadow},
    0px 4px 8px 0px ${colors.box_shadow}, 0px 8px 24px 0px ${colors.box_shadow};
  position: absolute;
  margin-top: 4px;
  z-index: 1;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
`;

const ItemDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 8px;
  cursor: pointer;
  p {
    ${Typography.body_md_regular};
    color: ${colors.text_text_secondary};
  }
  &:hover {
    background-color: ${colors.bg_white_hover};
    border-radius: 8px;
    p {
      color: ${colors.text_text_secondary_hover};
    }
  }
`;

export { MainDiv, ItemDiv };
