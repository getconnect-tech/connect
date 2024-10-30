import React from 'react';
import { User } from '@prisma/client';
import { capitalizeString, isEmpty } from '@/helpers/common';
import DropDown, { DropDownItem } from '../dropDown/dropDown';
import Tag from '../tag/tag';

interface Props {
  onClick: () => void;
  dropdownOpen: boolean;
  onClose: () => void;
  items: DropDownItem[];
  // eslint-disable-next-line no-unused-vars
  onChange: (item: any) => void;
  isActive?: boolean;
  iconSize?: string;
  selectedValue?: User;
  className?: string;
  onMouseEnter?: any;
  tagStyle?: React.CSSProperties;
}

export default function AssigneeDropdown({
  onClick,
  dropdownOpen,
  onClose,
  onChange,
  items,
  isActive = false,
  iconSize = '12',
  selectedValue,
  className,
  onMouseEnter,
  tagStyle,
}: Props) {
  return (
    <div onMouseEnter={onMouseEnter}>
      {/* apply className while open drop down */}
      <Tag
        isActive={isActive}
        onClick={(e: { stopPropagation: () => void }) => {
          e.stopPropagation(); // Stop event propagation
          onClick(); // Handle the click action
        }}
        isName={!isEmpty(selectedValue) ? true : false}
        iconName={'unassign-icon'}
        title={
          selectedValue
            ? capitalizeString(selectedValue?.display_name || '')
            : undefined
        }
        src={selectedValue?.profile_url || ''}
        style={selectedValue ? tagStyle : { padding: 0 }}
        svgStyle={selectedValue ? tagStyle : { margin: 6 }}
      />
      {dropdownOpen && (
        <DropDown
          items={items}
          iconSize={iconSize}
          iconViewBox={`0 0 ${iconSize} ${iconSize}`}
          onClose={onClose}
          onChange={onChange}
          isSearch={true}
          className={className}
        />
      )}
    </div>
  );
}
