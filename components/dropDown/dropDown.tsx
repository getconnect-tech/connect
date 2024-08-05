import React, { useCallback, useEffect, useRef, useState } from "react";
import SVGIcon from "@/assets/icons/SVGIcon";
import Avatar from "../avtar/Avtar";
import Input from "../input/input";
import { ItemDiv, ItemMainDiv, MainDiv, SearchDiv, StyledCheckbox } from "./style";

export type DropDownItem = {
  name: string;
  icon?: string;
  src?: string;
  isName?: boolean;
  value?: any;
};
interface DropDownProps {
  items: DropDownItem[];
  style?: React.CSSProperties;
  iconSize: string;
  iconViewBox: string;
  onClose: () => void;
  onChange?: (newItem: DropDownItem) => any;
  isSearch?: boolean;
  isCheckbox?: boolean;
}

// Hook to handle outside clicks
export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (ref.current && !ref.current.contains(event.target as Node)) {
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

export default function DropDown({
  items,
  style,
  iconSize,
  iconViewBox,
  onClose,
  isSearch = false,
  isCheckbox = false,
  onChange,
}: DropDownProps) {
  const dropDownRef = useOutsideClick(onClose);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: boolean;
  }>({});

  const handleItemClick = useCallback((name: string) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  }, []);

  const handleMouseEnter = (name: string) => {
    setHoveredItem(name);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };
  return (
    <MainDiv ref={dropDownRef} style={style}>
      {isSearch && (
        <SearchDiv>
          <Input
            placeholder={"Search"}
            style={{ border: "none", padding: "8px 12px" }}
            autoFocus={true}
            iconName="search-icon"
            iconSize="12"
            iconViewBox="0 0 12 12"
            isIcon={true}
          />
        </SearchDiv>
      )}
      <ItemMainDiv>
        {items.map((item, index) => (
          <ItemDiv
            key={index}
            isSelected={!!selectedItems[item.name]}
            isHovered={hoveredItem === item.name}
            onClick={() => {
              handleItemClick(item.name);
              onChange && onChange(item);
            }}
            onMouseEnter={() => handleMouseEnter(item.name)}
            onMouseLeave={handleMouseLeave}
          >
            {isCheckbox && <StyledCheckbox checked={selectedItems[item.name] || false} onChange={() => handleItemClick(item.name)} />}
            {item.icon && <SVGIcon name={item.icon} width={iconSize} height={iconSize} viewBox={iconViewBox} />}
            {item.src && item.isName && <Avatar name="" imgSrc={item.src} size={20} />}
            <p>{item.name}</p>
          </ItemDiv>
        ))}
      </ItemMainDiv>
    </MainDiv>
  );
}
