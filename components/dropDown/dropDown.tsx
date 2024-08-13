/* eslint-disable no-undef */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Avatar from '../avtar/Avtar';
import Input from '../input/input';
import {
  ItemDiv,
  ItemLeftDiv,
  ItemMainDiv,
  MainDiv,
  SearchDiv,
  StyledCheckbox,
} from './style';
import SVGIcon from '@/assets/icons/SVGIcon';

export type DropDownItem = {
  name: string;
  icon?: string;
  src?: string;
  isName?: boolean;
  value?: any;
  time?: string;
};

interface DropDownProps {
  items: DropDownItem[];
  style?: React.CSSProperties;
  iconSize: string;
  iconViewBox: string;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onChange?: (item: DropDownItem) => void;
  isSearch?: boolean;
  isCheckbox?: boolean;
  isContextMenu?: boolean;
  isSnooze?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleMouseEnter?: (e: any) => void;
  className?: string;
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
  isContextMenu = false,
  isSnooze = false,
  onChange,
  handleMouseEnter,
  className,
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

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <MainDiv
      ref={dropDownRef}
      style={style}
      isContextMenu={isContextMenu}
      className={className}
    >
      {isSearch && (
        <SearchDiv>
          <Input
            placeholder={isSnooze ? 'Snooze for... (e.g 7 days)' : 'Search'}
            autoFocus={true}
            iconName='search-icon'
            iconSize='12'
            iconViewBox='0 0 12 12'
            isIcon={true}
            className={isSnooze ? 'snooze-input' : 'input'}
          />
        </SearchDiv>
      )}
      <ItemMainDiv>
        {items.map((item, index) => (
          <ItemDiv
            key={index}
            isSelected={selectedItems[item.name]}
            isHovered={hoveredItem === item.name}
            onClick={(e) => {
              e.stopPropagation();
              handleItemClick(item.name);
              if (onChange) {
                onChange(item);
              }
              onClose();
            }}
            onMouseEnter={() => {
              // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
              handleMouseEnter;
              setHoveredItem(item.name);
            }}
            onMouseLeave={handleMouseLeave}
          >
            <ItemLeftDiv
              isSelected={selectedItems[item.name]}
              isHovered={hoveredItem === item.name}
            >
              {isCheckbox && (
                <StyledCheckbox
                  checked={selectedItems[item.name] || false}
                  onChange={() => {
                    handleItemClick(item.name);
                    if (onChange) {
                      onChange(item);
                      onClose();
                    }
                  }}
                />
              )}
              {item.icon && (
                <SVGIcon
                  name={item.icon}
                  width={iconSize}
                  height={iconSize}
                  viewBox={iconViewBox}
                />
              )}
              {item.isName && <Avatar name={item.name} imgSrc='' size={20} />}
              <p>{item.name}</p>
            </ItemLeftDiv>
            {isSnooze && <p>{item.time}</p>}
          </ItemDiv>
        ))}
      </ItemMainDiv>
    </MainDiv>
  );
}
