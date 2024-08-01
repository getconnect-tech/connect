/* eslint-disable react/display-name */
import React from "react";
import { ItemDiv, MainDiv } from "./style";
import SVGIcon from "@/assets/icons/SVGIcon";
import Avatar from "../avtar/Avtar";
import { useOutsideClick } from "@/helpers/common";

interface DropDownProps {
  items: { name: string; icon?: string; src?: string; isName?: boolean }[];
  style?: React.CSSProperties;
  iconSize: string;
  iconViewBox: string;
  onClose: () => void;
}

const DropDown = React.forwardRef<HTMLDivElement, DropDownProps>(
  ({ items, style, iconSize, iconViewBox, onClose }, ref) => {
    const dropDownRef = useOutsideClick(onClose);
    return (
      <MainDiv ref={dropDownRef} style={style}>
        {items.map((item, index) => (
          <ItemDiv key={index}>
            {item.icon && (
              <SVGIcon
                name={item.icon}
                width={iconSize}
                height={iconSize}
                viewBox={iconViewBox}
              />
            )}
            {item.src && item.isName && (
              <Avatar name="" imgSrc={item.src} size={20} />
            )}
            <p>{item.name}</p>
          </ItemDiv>
        ))}
      </MainDiv>
    );
  }
);

export default DropDown;
