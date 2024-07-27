"use client";
import React from "react";
import { CountText, ItemDiv, LeftDiv, Title } from "./style";
import SVGIcon from "@/assets/svg/SVGIcon";
import { colors } from "@/styles/colors";

interface Props {
  title: string;
  count?: number;
  icon: string;
  isActive?: boolean;
  onClickItem: () => void;
}

function NavbarItem(props: Props) {
  const { title, isActive, count, icon, onClickItem } = props;

  return (
    <ItemDiv isActive={isActive} onClick={onClickItem}>
      <LeftDiv>
        <SVGIcon
          name={icon}
          width="12"
          height="12"
          fill={isActive ? colors.icon_hover : colors.icon}
          viewBox="0 0 12 12"
        />
        <Title isActive={isActive}>{title}</Title>
      </LeftDiv>
      {count && count > 0 && <CountText>{count}</CountText>}
    </ItemDiv>
  );
}

export default NavbarItem;
