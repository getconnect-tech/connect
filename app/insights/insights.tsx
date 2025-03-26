'use client';
import React, { useCallback, useState } from 'react';
import ResponsiveNavbar from '@/components/navbar/ResponsiveNavbar';
import Icon from '@/components/icon/icon';
import { TICKETS_HEADER } from '@/global/constants';
import GraphList from '@/components/graphChart/graphList';
import CustomChart from '@/components/graphChart/custom';
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
  const onClickIcon = useCallback(() => {
    setIsNavbar(true);
  }, []);

  const onCloseNavbar = useCallback(() => {
    setIsNavbar(false);
  }, []);

  // Graph data
  const chartData = [
    { valueTitle: '<span>28</span> in todo', title: 'Queue size' },
    {
      valueTitle: '<span>2h 43m</span>',
      title: 'Median first response time',
    },
    { valueTitle: '<span>4h 44m</span>', title: 'Median resolution time' },
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
            <GraphList chartData={chartData} />
            <CustomChart />
          </ChartMainDiv>
        </BottomDiv>
      </MainDiv>
    </Main>
  );
}

export default Insights;
