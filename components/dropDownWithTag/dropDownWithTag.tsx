import React from 'react';
import DropDown, { DropDownItem } from '../dropDown/dropDown';
import Tag from '../tag/tag';
import { DropBox } from './style';
import SVGIcon from '@/assets/icons/SVGIcon';

interface Props {
  // eslint-disable-next-line no-unused-vars
  onClick: (item: DropDownItem) => void;
  title: string;
  iconName?: string;
  dropdownOpen: boolean;
  onClose: () => void;
  items: DropDownItem[];
  // eslint-disable-next-line no-unused-vars
  onChange: (item: DropDownItem) => void;
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
}: Props) {
  return (
    <div>
      {/* apply className while open drop down */}
      {isTag ? (
        <Tag
          isActive={isActive}
          onClick={() => onClick({ name: '', value: '' })}
          isName={isName}
          iconName={iconName}
          title={selectedValue ? selectedValue.name : title}
          src={src}
        />
      ) : (
        <DropBox
          onClick={() => onClick({ name: '', value: '' })}
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
        />
      )}
    </div>
  );
}
