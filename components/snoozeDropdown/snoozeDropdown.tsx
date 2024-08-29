import React, { useState } from 'react';
import { User } from '@prisma/client';
import DropDown, { DropDownItem } from '../dropDown/dropDown';
import Tag from '../tag/tag';
import DatePickerModal from '../datePicker/datePicker';

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

export default function SnoozeDropdown({
  onClick,
  dropdownOpen,
  onClose,
  onChange,
  items,
  isActive = false,
  iconSize = '12',
  className,
  onMouseEnter,
}: Props) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  return (
    <div onMouseEnter={onMouseEnter}>
      <Tag
        isActive={isActive}
        onClick={(e: { stopPropagation: () => void }) => {
          e.stopPropagation(); // Stop event propagation
          onClick(); // Handle the click action
        }}
        isName={false}
        iconName={'context-snooze-icon'}
        title={'Snooze'}
      />
      {dropdownOpen && (
        <DropDown
          items={items}
          iconSize={iconSize}
          iconViewBox={`0 0 ${iconSize} ${iconSize}`}
          onClose={onClose}
          onChange={(item) => {
            onChange(item);
            setShowDatePicker(true);
          }}
          isSearch={true}
          className={className}
          isSnooze={true}
          style={{ right: 20, maxWidth: 260, width: '100%', maxHeight: 'none' }}
        />
      )}
      {showDatePicker && (
        <DatePickerModal
          onClose={() => setShowDatePicker(false)}
          style={{ top: 4 }}
        />
      )}
    </div>
  );
}
