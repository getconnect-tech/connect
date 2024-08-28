import React, {
  useState,
  useCallback,
  SyntheticEvent,
  useEffect,
  useRef,
} from 'react';
import { observer } from 'mobx-react-lite';
import Avatar from '../avtar/Avtar';
import Input from '../input/input';
import {
  DateTimeTextDiv,
  ItemDiv,
  ItemLeftDiv,
  ItemMainDiv,
  MainDiv,
  SearchDiv,
  StyledCheckbox,
} from './style';
import SVGIcon from '@/assets/icons/SVGIcon';
import { isEmpty } from '@/helpers/common';
import { LabelData } from '@/utils/dataTypes';

export type DropDownItem = {
  name: string;
  icon?: string;
  src?: string;
  isName?: boolean;
  value?: any;
  time?: string;
  isDelete?: boolean;
  status?: string;
};

interface DropDownProps {
  items: DropDownItem[];
  style?: React.CSSProperties;
  userId?: string;
  handleClick?: (
    // eslint-disable-next-line no-unused-vars
    hoveredItem: string | null,
    // eslint-disable-next-line no-unused-vars
    userId: string,
    // eslint-disable-next-line no-unused-vars
    status: string,
  ) => void;
  // eslint-disable-next-line no-unused-vars
  handleLabel?: (labelData: LabelData) => void;
  // eslint-disable-next-line no-unused-vars
  handleDeleteLabel?: (labelId: string) => void;
  labelData?: LabelData;
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

    // eslint-disable-next-line no-undef
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // eslint-disable-next-line no-undef
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
  handleLabel,
  handleDeleteLabel,
  labelData,
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
  // eslint-disable-next-line no-undef
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

      // for members
      if (handleClick)
        handleClick(hoveredItem, userId || '', item.status || '');

      // for labels
      if (labelData) {
        if (hoveredItem === 'Edit' && handleLabel) {
          handleLabel(labelData);
        } else if (hoveredItem === 'Delete' && handleDeleteLabel) {
          handleDeleteLabel(labelData.labelId);
        }
      }

      handleItemClick(item.name);
      if (onChange) {
        onChange(item);
      }
      onClose();
    },
    [handleClick, handleItemClick, onChange, onClose, userId],
  );

  const searchQuery = useCallback(
    (value: string) => {
      const result =
        items?.filter((item) =>
          item?.name?.toLowerCase().includes(value?.toLowerCase()),
        ) || [];
      setSearchResult(result);
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

  const handleDateTimeClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    if (onChange) {
      onChange({ name: 'date&time' });
      onClose();
    }
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
            value={query}
            onChange={(e: { target: { value: string } }) =>
              onChangeSearch(e.target.value)
            }
          />
        </SearchDiv>
      )}
      <ItemMainDiv>
        {searchResult.map((item, index) => (
          <ItemDiv
            key={index}
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
      {isSnooze && (
        <div className='date-time-text'>
          <DateTimeTextDiv onClick={handleDateTimeClick}>
            <p>Date & Time</p>
            <SVGIcon
              name='left-arrow-icon'
              width='10'
              height='10'
              viewBox='0 0 10 10'
            />
          </DateTimeTextDiv>
        </div>
      )}
    </MainDiv>
  );
};

export default observer(DropDown);
