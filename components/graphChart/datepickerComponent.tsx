import React from 'react';
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import SVGIcon from '@/assets/icons/SVGIcon';
import { customDueDateItems } from '@/helpers/raw';
import DropDownWithTag from '../dropDownWithTag/dropDownWithTag';
import { HeaderText, DatePickerHeader, PickerContainer } from './style';

const { RangePicker } = DatePicker;

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
        <RangePicker
          onChange={(dates) =>
            handleDateChange(dates as [Dayjs | null, Dayjs | null])
          }
          value={dateRange}
          format='MMM D, YYYY'
          allowClear={false}
          placeholder={['Start date', 'End date']}
          suffixIcon={
            <SVGIcon
              name='calendar-icon'
              viewBox='0 0 12 12'
              width='12'
              height='12'
            />
          }
        />
      </PickerContainer>
    </DatePickerHeader>
  );
}

export default DatepickerComponent;
