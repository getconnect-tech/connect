'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import type { Dayjs } from 'dayjs';
import ResponsiveNavbar from '@/components/navbar/ResponsiveNavbar';
import Icon from '@/components/icon/icon';
import { TICKETS_HEADER } from '@/global/constants';
import {
  getFirstResponseTime,
  getQueueSize,
  getResolutionTime,
} from '@/services/clientSide/insightsService';
import { useStores } from '@/stores';
import { convertToHoursAndMinutes, isEmpty } from '@/helpers/common';
import CustomChart from '@/components/graphChart/chart';
import DatepickerComponent from '@/components/graphChart/datepickerComponent';
import InsightsLoading from '@/components/insightsLoading/insightsLoading';
import {
  BottomDiv,
  ChartContainer,
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
  const [loading, setLoading] = useState(false);
  const { workspaceStore, insightsStore } = useStores();
  const { currentWorkspace } = workspaceStore || {};
  const { queueSize, firstResponseTime, resolutionTime } = insightsStore || {};
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

  const loadData = useCallback(async () => {
    setLoading(true);
    if (!isEmpty(currentWorkspace?.id)) {
      const payload = {
        startDate: dateRange[0]?.toISOString(),
        endDate: dateRange[1]?.toISOString(),
      };
      await Promise.all([
        getQueueSize(payload),
        getFirstResponseTime(payload),
        getResolutionTime(payload),
      ]);
      setLoading(false);
    }
  }, [currentWorkspace?.id, dateRange]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onClickIcon = useCallback(() => {
    setIsNavbar(true);
  }, []);

  const onCloseNavbar = useCallback(() => {
    setIsNavbar(false);
  }, []);

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
        {loading && <InsightsLoading />}
        {!loading && (
          <BottomDiv isShowNavbar={isNavbar} onClick={onCloseNavbar}>
            <ChartMainDiv>
              <DatepickerComponent
                onClickTag={onClickTag}
                isOpenDropdown={isOpenDropdown}
                setIsOpenDropdown={setIsOpenDropdown}
                handleDropdownChange={handleDropdownChange}
                selectedValue={selectedValue}
                handleDateChange={handleDateChange}
                dateRange={dateRange}
                headerText={'Overview'}
              />
              <ChartContainer>
                <CustomChart
                  valueTitle={`<span>${queueSize?.currentQueueSize}</span> in todo`}
                  title='Queue size'
                  ctrData={queueSize?.data.map((item) => item.queueSize) || []}
                  isQueueSize
                  tooltipContent='A snapshot of the number of threads in Todo'
                />
                <CustomChart
                  valueTitle={`<span>${convertToHoursAndMinutes(
                    firstResponseTime?.overallMedian as number,
                  )}</span>`}
                  title='Median first response time'
                  ctrData={
                    firstResponseTime?.data.map((item) => item.median) || []
                  }
                  isTimeFormat
                  tooltipContent='Average time for your team’s first response.'
                />
                <CustomChart
                  valueTitle={`<span>${convertToHoursAndMinutes(
                    resolutionTime?.overallMedian as number,
                  )}</span>`}
                  title='Median resolution time'
                  ctrData={
                    resolutionTime?.data.map((item) => item.median) || []
                  }
                  isTimeFormat
                  tooltipContent='Average time to resolve customer requests.'
                />
              </ChartContainer>
            </ChartMainDiv>
          </BottomDiv>
        )}
      </MainDiv>
    </Main>
  );
}

export default observer(Insights);
