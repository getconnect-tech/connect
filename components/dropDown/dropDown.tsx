import React, {
  useState,
  useCallback,
  SyntheticEvent,
  useEffect,
  useRef,
} from 'react';
import { observer } from 'mobx-react-lite';
import { Label } from '@prisma/client';
import moment from 'moment';
import Avatar from '../avtar/Avtar';
import Input from '../input/input';
import {
  DateTimeTextDiv,
  ItemDiv,
  ItemLeftDiv,
  ItemMainDiv,
  ItemName,
  MainDiv,
  SearchDiv,
  StyledCheckbox,
} from './style';
import SVGIcon from '@/assets/icons/SVGIcon';
import { isEmpty } from '@/helpers/common';
import LabelSvgIcon from '@/assets/icons/labelIcons';
import { HandleClickProps } from '@/utils/appTypes';

export type DropDownItem = {
  name: string;
  icon?: string;
  labelId?: string;
  src?: string;
  isName?: boolean;
  value?: any;
  time?: string;
  isDelete?: boolean;
  status?: string;
  duration?: string;
};

interface DropDownProps {
  items: DropDownItem[] | any;
  style?: React.CSSProperties;
  handleClick?: ({
    // eslint-disable-next-line no-unused-vars
    value,
    // eslint-disable-next-line no-unused-vars
    status,
    // eslint-disable-next-line no-unused-vars
    labelData,
    // eslint-disable-next-line no-unused-vars
    labelId,
    // eslint-disable-next-line no-unused-vars
    isChecked,
  }: HandleClickProps) => void;
  iconSize: string;
  iconViewBox: string;
  onClose?: () => void;
  // eslint-disable-next-line no-unused-vars
  onChange?: (item: any) => void;
  ticketLabelData?: Label[];
  isSearch?: boolean;
  isCheckbox?: boolean;
  isContextMenu?: boolean;
  isSnooze?: boolean;
  isMacro?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleMouseEnter?: (e: any) => void;
  className?: string;
  labelField?: string;
  onMouseLeave?: () => void;
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
  handleClick,
  iconSize,
  iconViewBox,
  onClose,
  isSearch = false,
  isCheckbox = false,
  isContextMenu = false,
  isSnooze = false,
  isMacro = false,
  onChange,
  ticketLabelData,
  handleMouseEnter,
  className,
  onMouseLeave,
  labelField = 'name',
}: DropDownProps) => {
  const dropDownRef = useOutsideClick(onClose!);
  const [value, setValueItem] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState<DropDownItem[]>([]);
  // eslint-disable-next-line no-undef
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getItemsList = useCallback(() => {
    if (labelField !== 'name' && !isEmpty(labelField)) {
      const updatedItems = items?.map((item: any) => {
        return { ...(item || {}), name: item[labelField] };
      });
      return updatedItems;
    } else {
      return items;
    }
  }, []);

  useEffect(() => {
    const itemsList = getItemsList();
    setSearchResult(itemsList);
  }, []);

  const onClickItem = useCallback(
    (e: SyntheticEvent, item: DropDownItem, value: string | null) => {
      e.stopPropagation();

      if (handleClick) {
        // label for tickets
        if (ticketLabelData) {
          const isChecked = ticketLabelData?.some(
            (label: { id: string }) => label.id === item.labelId,
          );
          // isChecked true then remove label from ticket or isChecked false then add label in ticket
          handleClick({ isChecked, labelId: item.labelId });
        } else handleClick({ value, item });
      }

      if (onChange) onChange(item);
      if (onClose) onClose();
    },
    [handleClick, onChange, onClose],
  );

  const searchQuery = useCallback((value: string) => {
    const result =
      getItemsList()?.filter((item: any) =>
        item?.name?.toLowerCase().includes(value?.toLowerCase()),
      ) || [];
    setSearchResult(result);
  }, []);

  const onChangeSearch = useCallback(
    (value: string) => {
      setQuery(value);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        searchQuery(value);
      }, 300);
      if (isEmpty(value)) {
        setSearchResult(getItemsList);
      }
    },
    [searchQuery],
  );

  const handleDateTimeClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    if (onChange) {
      onChange({ name: 'date&time' });
      if (onClose) onClose();
    }
  };

  const handleMacrosClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    if (onChange) {
      onChange({ name: 'manage-macros' });
      if (onClose) onClose();
    }
  };

  return (
    <MainDiv
      ref={dropDownRef}
      style={style}
      isContextMenu={isContextMenu}
      className={className}
      onMouseLeave={onMouseLeave}
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
        {searchResult.map((item, index) => {
          const isChecked = ticketLabelData?.some(
            (label: { id: string }) => label.id === item.labelId,
          );
          return (
            <ItemDiv
              key={index}
              onClick={(e) => onClickItem(e, item, value)}
              onMouseEnter={() => {
                // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
                handleMouseEnter;
                setValueItem(item.name);
              }}
              isSelected={isChecked}
              isDelete={item.isDelete}
            >
              <ItemLeftDiv
                isSelected={isChecked}
                isDelete={item.isDelete || false}
              >
                {isCheckbox && (
                  <StyledCheckbox
                    checked={isChecked}
                    onChange={() => {
                      if (onChange) {
                        onChange(item);
                      }
                    }}
                  />
                )}
                {item.icon &&
                  (isCheckbox ? (
                    <LabelSvgIcon
                      name={item.icon}
                      width={iconSize}
                      height={iconSize}
                      viewBox={iconViewBox}
                    />
                  ) : (
                    <SVGIcon
                      name={item.icon}
                      width={iconSize}
                      height={iconSize}
                      viewBox={iconViewBox}
                    />
                  ))}

                {item.isName && (
                  <Avatar name={item.name} imgSrc={item.src || ''} size={20} />
                )}
                <p>{item.name}</p>
              </ItemLeftDiv>
              <ItemName>{item.duration}</ItemName>
              {isSnooze && (
                <ItemName>
                  {item.name === 'Later today' || item.name === 'This evening'
                    ? moment(item.value).format('h:mm A')
                    : moment(item.value).format('ddd, MMM D, h:mm A')}
                </ItemName>
              )}
            </ItemDiv>
          );
        })}
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
      {isMacro && (
        <div className='date-time-text'>
          <DateTimeTextDiv onClick={handleMacrosClick}>
            <p>Manage Macros</p>
          </DateTimeTextDiv>
        </div>
      )}
    </MainDiv>
  );
};

export default observer(DropDown);
