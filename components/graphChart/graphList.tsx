import React from 'react';
import type { Dayjs } from 'dayjs';
import { ChartData } from '@/utils/appTypes';
import DatepickerComponent from './datepickerComponent';
import { List } from './style';
import CustomChart from './chart';

interface Chart {
  valueTitle: string;
  title: string;
  chartData: ChartData[];
  isQueueSize?: boolean;
  isTimeFormat?: boolean;
}

interface Props {
  chartData: Chart[];
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

function GraphList({
  chartData,
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
    <>
      <DatepickerComponent
        onClickTag={onClickTag}
        isOpenDropdown={isOpenDropdown}
        setIsOpenDropdown={setIsOpenDropdown}
        handleDropdownChange={handleDropdownChange}
        selectedValue={selectedValue}
        handleDateChange={handleDateChange}
        dateRange={dateRange}
        headerText={headerText}
      />
      <List>
        {chartData.map((item, index) => (
          <CustomChart
            key={index}
            valueTitle={item.valueTitle}
            title={item.title}
            ctrData={item.chartData.map((data) => data.queueSize)}
            isQueueSize={item.isQueueSize}
            isTimeFormat={item.isTimeFormat}
          />
        ))}
      </List>
    </>
  );
}

export default GraphList;
