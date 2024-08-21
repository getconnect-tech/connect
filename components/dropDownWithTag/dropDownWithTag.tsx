import React from 'react';
import DropDown, { DropDownItem } from '../dropDown/dropDown';
import Tag from '../tag/tag';
import { DropBox } from './style';
import SVGIcon from '@/assets/icons/SVGIcon';
import { capitalizeString } from '@/helpers/common';

interface Props {
  // eslint-disable-next-line no-unused-vars
  onClick: (item: DropDownItem) => void;
  title: string;
  iconName?: string;
  dropdownOpen: boolean;
  onClose: () => void;
  items: DropDownItem[];
  // eslint-disable-next-line no-unused-vars
  onChange: (item: any) => void;
  style?: React.CSSProperties;
  dropDownStyle?: React.CSSProperties;
  isTag: boolean;
  isActive?: boolean;
  isName?: boolean;
  isSearch?: boolean;
  isCheckbox?: boolean;
  iconSize?: string;
  iconViewBox?: string;
  src?: string;
  selectedValue?: DropDownItem;
  className?: string;
  onMouseEnter?: any;
  tagStyle?: React.CSSProperties;
  isSnooze?: boolean;
  unAssign?: string;
}

export default function DropDownWithTag({
  onClick,
  title,
  iconName = '',
  dropdownOpen,
  onClose,
  onChange,
  items,
  style,
  dropDownStyle,
  isTag = false,
  isActive = false,
  isName = false,
  isSearch = false,
  isCheckbox = false,
  iconSize = '12',
  iconViewBox = '0 0 12 12',
  src,
  selectedValue,
  className,
  onMouseEnter,
  tagStyle,
  isSnooze = false,
  unAssign = '',
}: Props) {
  return (
    <div onMouseEnter={onMouseEnter}>
      {/* apply className while open drop down */}
      {isTag ? (
        <Tag
          isActive={isActive}
          onClick={(e: { stopPropagation: () => void }) => {
            e.stopPropagation(); // Stop event propagation
            onClick({ name: title, value: '' }); // Handle the click action
          }}
          isName={isName}
          iconName={iconName}
          title={selectedValue ? capitalizeString(selectedValue.name) : title}
          src={src}
          style={tagStyle}
          iconSize={iconSize}
          unAssign={unAssign}
          iconViewBox={iconViewBox}
        />
      ) : (
        <DropBox
          onClick={(e: { stopPropagation: () => void }) => {
            e.stopPropagation(); // Stop event propagation
            onClick({ name: title, value: '' }); // Handle the click action
          }}
          className='tag-div'
          style={style}
        >
          {selectedValue ? selectedValue.name : title}
          <SVGIcon
            name={iconName}
            width='12px'
            height='12px'
            viewBox='0 0 12 12'
          />
        </DropBox>
      )}
      {dropdownOpen && (
        <DropDown
          items={items}
          iconSize={iconSize}
          iconViewBox={iconViewBox}
          onClose={onClose}
          onChange={onChange}
          style={dropDownStyle}
          isSearch={isSearch}
          isCheckbox={isCheckbox}
          className={className}
          isSnooze={isSnooze}
        />
      )}
    </div>
  );
}
