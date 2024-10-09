'use client';
import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  BottomDiv,
  HeaderDiv,
  Main,
  MainDiv,
  Tab,
  TabDiv,
  Title,
  TopDiv,
} from './style';
import PersonList from './personList';
import CompanyList from './companyList';
import Icon from '@/components/icon/icon';
import ResponsiveNavbar from '@/components/navbar/ResponsiveNavbar';

const Contact = () => {
  const [activeTab, setActiveTab] = useState('People');
  const tabItem = ['People', 'Company'];
  const [isNavbar, setIsNavbar] = useState(false);

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
            <div className='title-div'>
              <Icon
                iconName='sidebar-icon'
                iconSize='16'
                iconViewBox='0 0 16 16'
                className='sidebar-icon'
                onClick={onClickIcon}
              />
              <Title>Contact</Title>
            </div>
            <TabDiv>
              {tabItem.map((tab) => (
                <Tab
                  key={tab}
                  active={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </Tab>
              ))}
            </TabDiv>
          </HeaderDiv>
        </TopDiv>
        <div style={{ padding: '0 16px' }}>
          <BottomDiv>
            {activeTab === 'People' && <PersonList isShowNavbar={isNavbar} />}
            {activeTab === 'Company' && <CompanyList isShowNavbar={isNavbar} />}
          </BottomDiv>
        </div>
      </MainDiv>
    </Main>
  );
};
export default observer(Contact);
