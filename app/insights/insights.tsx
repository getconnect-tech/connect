'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import ResponsiveNavbar from '@/components/navbar/ResponsiveNavbar';
import Icon from '@/components/icon/icon';
import { TICKETS_HEADER } from '@/global/constants';
import {
  getFirstResponseTime,
  getQueueSize,
  getResolutionTime,
} from '@/services/clientSide/insightsService';
import { useStores } from '@/stores';
import { isEmpty } from '@/helpers/common';
import CustomChart from '@/components/graphChart/chart';
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

  const { workspaceStore, insightsStore } = useStores();
  const { currentWorkspace } = workspaceStore || {};
  const { queueSize, firstResponseTime, resolutionTime } = insightsStore || {};

  const loadData = useCallback(async () => {
    if (!isEmpty(currentWorkspace?.id)) {
      await Promise.all([
        getQueueSize(),
        getFirstResponseTime(),
        getResolutionTime(),
      ]);
    }
  }, [currentWorkspace?.id]);

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
        <BottomDiv isShowNavbar={isNavbar} onClick={onCloseNavbar}>
          <ChartMainDiv>
            {/* <GraphList chartData={chartData} /> */}
            <CustomChart
              valueTitle='<span>28</span> in todo'
              title='Queue size'
              chartData={queueSize?.data || []}
              ctrData={queueSize?.data.map((item) => item.queueSize) || []}
              isQueueSize
            />
            <CustomChart
              valueTitle='<span>2h 43m</span>'
              title='Median first response time'
              ctrData={firstResponseTime?.data.map((item) => item.median) || []}
              isFirstResponseTime
            />
            <CustomChart
              valueTitle='<span>4h 44m</span>'
              title='Median resolution time'
              ctrData={resolutionTime?.data.map((item) => item.median) || []}
              isResolutionTime
            />
          </ChartMainDiv>
        </BottomDiv>
      </MainDiv>
    </Main>
  );
}

export default observer(Insights);
