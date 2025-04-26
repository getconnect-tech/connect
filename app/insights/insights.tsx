'use client';
import React, { useCallback, useState } from 'react';
import type { Dayjs } from 'dayjs';
import ResponsiveNavbar from '@/components/navbar/ResponsiveNavbar';
import Icon from '@/components/icon/icon';
import { TICKETS_HEADER } from '@/global/constants';
import GraphList from '@/components/graphChart/graphList';
import { chartDemoData } from '@/helpers/raw';
import {
  BottomDiv,
  ChartMainDiv,
  HeaderDiv,
  IconAndTitle,
  Main,
  MainDiv,
  Title,
  TopDiv,
} from './style';

interface InsightsProps {
  activeNav?: number;
}

function Insights({ activeNav }: InsightsProps) {
  const [isNavbar, setIsNavbar] = useState(false);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState({ name: 'Last 30 days' });

  const handleDateChange = useCallback(
    (dates: [Dayjs | null, Dayjs | null] | null) => {
      if (dates) {
        setDateRange(dates);
      }
    },
    [],
  );

  const onClickTag = useCallback(() => {
    setIsOpenDropdown(!isOpenDropdown);
  }, [isOpenDropdown]);

  const handleDropdownChange = useCallback((item: any) => {
    setSelectedValue(item);
  }, []);

  const onClickIcon = useCallback(() => {
    setIsNavbar(true);
  }, []);

  const onCloseNavbar = useCallback(() => {
    setIsNavbar(false);
  }, []);

  // Graph data
  const chartData = [
    {
      valueTitle: '<span>28</span> in todo',
      title: 'Queue size',
      chartData: chartDemoData,
    },
    {
      valueTitle: '<span>2h 43m</span>',
      title: 'Median first response time',
      chartData: chartDemoData,
    },
    {
      valueTitle: '<span>4h 44m</span>',
      title: 'Median resolution time',
      chartData: chartDemoData,
    },
  ];

  return (
    <Main>
      {isNavbar && <ResponsiveNavbar onClose={onCloseNavbar} />}
      <MainDiv>
        <TopDiv>
          <HeaderDiv>
            <IconAndTitle>
              <Icon
                iconName='sidebar-icon'
                iconSize='16'
                iconViewBox='0 0 16 16'
                className='sidebar-icon'
                onClick={onClickIcon}
              />
              <Title>
                {activeNav ? TICKETS_HEADER[activeNav] : 'Insights'}
              </Title>
            </IconAndTitle>
          </HeaderDiv>
        </TopDiv>
        <BottomDiv isShowNavbar={isNavbar} onClick={onCloseNavbar}>
          <ChartMainDiv>
            <GraphList
              chartData={chartData}
              onClickTag={onClickTag}
              isOpenDropdown={isOpenDropdown}
              setIsOpenDropdown={setIsOpenDropdown}
              handleDropdownChange={handleDropdownChange}
              selectedValue={selectedValue}
              handleDateChange={handleDateChange}
              dateRange={dateRange}
              headerText={'Overview'}
            />
          </ChartMainDiv>
        </BottomDiv>
      </MainDiv>
    </Main>
  );
}

export default Insights;
