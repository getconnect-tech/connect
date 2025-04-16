'use client';
import React, { useCallback, useEffect, useState } from 'react';
import ResponsiveNavbar from '@/components/navbar/ResponsiveNavbar';
import Icon from '@/components/icon/icon';
import { TICKETS_HEADER } from '@/global/constants';
import GraphList from '@/components/graphChart/graphList';
import { insightStore } from '@/stores/insightStore';
import { observer } from 'mobx-react-lite';
import { getQueueSizeInsights } from '@/services/clientSide/insightServices';
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
  const { queueSizeData, loading } = insightStore;

  const onClickIcon = useCallback(() => {
    setIsNavbar(true);
  }, []);

  const onCloseNavbar = useCallback(() => {
    setIsNavbar(false);
  }, []);

  // Load data when component mounts
  useEffect(() => {
    const loadData = async () => {
      const data = await getQueueSizeInsights();
      console.log('Queue size data loaded:', data); // Debug log
    };
    loadData();
  }, []);

  // Get the latest queue size
  const currentQueueSize = queueSizeData?.data?.[queueSizeData?.data?.length - 1]?.queueSize || 0;
  console.log('Current queue size:', currentQueueSize); // Debug log

  // Graph data using real data from the API
  const chartData = [
    {
      valueTitle: `<span>${currentQueueSize}</span> in todo`,
      title: 'Queue size',
      chartData: queueSizeData?.data || [],
    }
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
            {loading ? (
              <div>Loading insights...</div>
            ) : (
              <GraphList chartData={chartData} />
            )}
          </ChartMainDiv>
        </BottomDiv>
      </MainDiv>
    </Main>
  );
}

export default observer(Insights);
