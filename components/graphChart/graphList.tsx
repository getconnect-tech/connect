import React, { useState } from 'react';
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import { ChartData } from '@/utils/appTypes';
import Tag from '../tag/tag';
import { DatePickerHeader, HeaderText, List, PickerContainer } from './style';
import CustomChart from './chart';

const { RangePicker } = DatePicker;

interface Chart {
  valueTitle: string;
  title: string;
  chartData: ChartData[];
}
interface Props {
  chartData: Chart[];
}

function GraphList({ chartData }: Props) {
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates) {
      setDateRange(dates);
    }
  };

  return (
    <>
      <DatePickerHeader>
        <HeaderText>Overview</HeaderText>
        <PickerContainer>
          <Tag
            onClick={() => {}}
            isName={false}
            iconName='calendar-icon'
            title='Last 28 days'
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
          />
        </PickerContainer>
      </DatePickerHeader>
      <List>
        {chartData.map((item, index) => (
          <CustomChart
            key={index}
            valueTitle={item.valueTitle}
            title={item.title}
            chartData={item?.chartData}
          />
        ))}
      </List>
    </>
  );
}

export default GraphList;
