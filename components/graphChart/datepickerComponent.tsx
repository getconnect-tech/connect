import React, { useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { DateRange as DateRangeComponent } from 'react-date-range';
import type { Range, RangeKeyDict } from 'react-date-range';
import SVGIcon from '@/assets/icons/SVGIcon';
import { customDueDateItems } from '@/helpers/raw';
import DropDownWithTag from '../dropDownWithTag/dropDownWithTag';
import {
  HeaderText,
  DatePickerHeader,
  PickerContainer,
  CalendarContainer,
  DateRangePickerContainer,
  DateRangeText,
} from './style';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

// Cast DateRange component to any to bypass TypeScript checks
const DateRange = DateRangeComponent as any;

/**
 * Date Picker Component
 * A component that provides date range selection functionality with a dropdown for quick date presets
 * @param {Object} props - Component props
 * @param {Function} props.onClickTag - Callback function triggered when the tag is clicked
 * @param {boolean} props.isOpenDropdown - Boolean indicating whether the dropdown is currently open
 * @param {Function} props.setIsOpenDropdown - Function to set the dropdown open state
 * @param {Function} props.handleDropdownChange - Callback function triggered when a dropdown item is selected
 * @param {Object} props.selectedValue - Currently selected value from the dropdown
 * @param {string} props.selectedValue.name - Name of the selected value
 * @param {Function} props.handleDateChange - Callback function triggered when date range is changed
 * @param {Array} props.dateRange - Current date range selection [startDate, endDate]
 * @param {string} props.headerText - Text to display in the header
 */
interface Props {
  onClickTag: () => void;
  isOpenDropdown: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpenDropdown: (value: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  handleDropdownChange: (item: any) => void;
  selectedValue: { name: string };
  // eslint-disable-next-line no-unused-vars
  handleDateChange: (dates: [Dayjs | null, Dayjs | null] | null) => void;
  dateRange: [Dayjs | null, Dayjs | null];
  headerText: string;
}

function DatepickerComponent({
  onClickTag,
  isOpenDropdown,
  setIsOpenDropdown,
  handleDropdownChange,
  selectedValue,
  handleDateChange,
  dateRange,
  headerText,
}: Props) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectionRange, setSelectionRange] = useState<Range>({
    startDate: dateRange[0]?.toDate() || new Date(),
    endDate: dateRange[1]?.toDate() || new Date(),
    key: 'selection',
  });

  const handleSelect = (ranges: RangeKeyDict) => {
    const range = ranges.selection;
    if (range?.startDate && range?.endDate) {
      handleDateChange([dayjs(range.startDate), dayjs(range.endDate)]);
      setSelectionRange(range);
    }
  };

  return (
    <DatePickerHeader>
      <HeaderText>{headerText}</HeaderText>
      <PickerContainer>
        <DropDownWithTag
          onClick={onClickTag}
          title={'Last 30 days'}
          iconName={'calendar-icon'}
          dropdownOpen={isOpenDropdown}
          onClose={() => setIsOpenDropdown(false)}
          items={customDueDateItems}
          onChange={handleDropdownChange}
          selectedValue={selectedValue}
          isTag={true}
          isActive={true}
        />
        <DateRangePickerContainer
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <SVGIcon
            name='calendar-icon'
            viewBox='0 0 12 12'
            width='12'
            height='12'
          />
          <DateRangeText>
            {`${dayjs(selectionRange.startDate).format('MMM D')} - ${dayjs(selectionRange.endDate).format('MMM D')}`}
          </DateRangeText>
        </DateRangePickerContainer>
        {showCalendar && (
          <CalendarContainer>
            <DateRange
              editableDateInputs={true}
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              ranges={[selectionRange]}
              maxDate={new Date()}
            />
          </CalendarContainer>
        )}
      </PickerContainer>
    </DatePickerHeader>
  );
}

export default DatepickerComponent;
