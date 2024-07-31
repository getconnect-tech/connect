/* eslint-disable react/display-name */
import React from "react";
import { ItemDiv, MainDiv } from "./style";
import SVGIcon from "@/assets/icons/SVGIcon";
import { colors } from "@/styles/colors";
import Avatar from "../avtar/Avtar";

interface DropDownProps {
  items: { name: string; icon?: string; src?: string; isName?: boolean }[];
  style?: React.CSSProperties;
}

const DropDown = React.forwardRef<HTMLDivElement, DropDownProps>(
  ({ items, style }, ref) => {
    return (
      <MainDiv ref={ref} style={style}>
        {items.map((item, index) => (
          <ItemDiv key={index}>
            {item.isName ? (
              <Avatar name="" imgSrc={`${item.src}`} size={20} />
            ) : (
              <SVGIcon
                name={item.icon}
                width="20"
                height="20"
                className="icon"
                viewBox="0 0 20 20"
              />
            )}
            <p>{item.name}</p>
          </ItemDiv>
        ))}
      </MainDiv>
    );
  }
);

export default DropDown;
