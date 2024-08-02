/* eslint-disable react/display-name */
import React, { useEffect, useRef } from "react";
import { ItemDiv, MainDiv } from "./style";
import SVGIcon from "@/assets/icons/SVGIcon";
import Avatar from "../avtar/Avtar";

interface DropDownProps {
  items: { name: string; icon?: string; src?: string; isName?: boolean }[];
  style?: React.CSSProperties;
  iconSize: string;
  iconViewBox: string;
  onClose: () => void;
}

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (ref.current && !ref.current.contains(event.target as Node)) {
        //className thorugh close drop down
        if (target.closest(`.tag-div`)) {
          return;
        }
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
};

const DropDown = React.forwardRef<HTMLDivElement, DropDownProps>(
  ({ items, style, iconSize, iconViewBox, onClose }, ref) => {
    const dropDownRef = useOutsideClick(onClose);
    return (
      <MainDiv ref={dropDownRef} style={style} onClick={onClose}>
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
