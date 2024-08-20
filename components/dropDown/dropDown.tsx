/* eslint-disable no-undef */
import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { observer } from 'mobx-react-lite';
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
import { isEmpty } from '@/helpers/common';

export type DropDownItem = {
  name: string;
  icon?: string;
  src?: string;
  isName?: boolean;
  value?: any;
  time?: string;
  isDelete?: boolean;
};

interface DropDownProps {
  items: DropDownItem[];
  style?: React.CSSProperties;
  userId?: string;
  // eslint-disable-next-line no-unused-vars
  handleClick?: (hoveredItem: string | null, userId: string) => void;
  iconSize: string;
  iconViewBox: string;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onChange?: (item: any) => void;
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

const DropDown = ({
  items,
  style,
  userId,
  handleClick,
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
}: DropDownProps) => {
  const dropDownRef = useOutsideClick(onClose);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: boolean;
  }>({});
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState<DropDownItem[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSearchResult(items);
  }, [items]);

  const handleItemClick = useCallback((name: string) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  }, []);

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const onClickItem = useCallback(
    (e: SyntheticEvent, item: DropDownItem, hoveredItem: string | null) => {
      e.stopPropagation();
      if (handleClick) handleClick(hoveredItem, userId || '');
      handleItemClick(item.name);
      if (onChange) {
        onChange(item);
      }
      onClose();
    },
    [],
  );

  const searchQuery = useCallback(
    (value: string) => {
      const result =
        items?.filter((item) =>
          item?.name?.toLowerCase().includes(value?.toLowerCase()),
        ) || [];
      setSearchResult(result.length > 0 || !isEmpty(value) ? result : items);
    },
    [items],
  );

  const onChangeSearch = useCallback(
    (value: string) => {
      setQuery(value);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        searchQuery(value);
      }, 300);

      if (isEmpty(value)) {
        setSearchResult(items);
      }
    },
    [searchQuery, items],
  );

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
            value={query}
            onChange={(e: { target: { value: string } }) =>
              onChangeSearch(e.target.value)
            }
          />
        </SearchDiv>
      )}
      <ItemMainDiv>
        {(searchResult.length > 0 ? searchResult : items).map((item, index) => (
          <ItemDiv
            key={index}
            isSelected={selectedItems[item.name]}
            isHovered={hoveredItem === item.name}
            onClick={(e) => onClickItem(e, item, hoveredItem)}
            onMouseEnter={() => {
              // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
              handleMouseEnter;
              setHoveredItem(item.name);
            }}
            onMouseLeave={handleMouseLeave}
          >
            <ItemLeftDiv
              isSelected={selectedItems[item.name]}
              isHovered={!item.isDelete && hoveredItem === item.name}
              isDelete={item.isDelete || false}
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
              {item.isName && (
                <Avatar name={item.name} imgSrc={item.src || ''} size={20} />
              )}
              <p>{item.name}</p>
            </ItemLeftDiv>
            {isSnooze && <p>{item.time}</p>}
          </ItemDiv>
        ))}
      </ItemMainDiv>
    </MainDiv>
  );
};

export default observer(DropDown);
