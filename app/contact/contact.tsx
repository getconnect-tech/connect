'use client';
import React, { useCallback, useEffect, useState } from 'react';
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
import { isEmpty } from '@/helpers/common';
import { getAllGroup } from '@/services/clientSide/contactServices';
import { useStores } from '@/stores';
import { Group } from '@/utils/dataTypes';

const Contact = () => {
  const { workspaceStore } = useStores();
  const { currentWorkspace } = workspaceStore || {};
  const [activeTab, setActiveTab] = useState('People');
  const [tabItem, setTabItem] = useState<string[]>([]);

  const loadData = useCallback(async () => {
    if (!isEmpty(currentWorkspace?.id)) {
      const groupList: Group[] = await getAllGroup();
      setTabItem([
        'People',
        ...Array.from(
          new Set(
            groupList.map((item: { group_label: string }) => item.group_label),
          ),
        ),
      ]);
    }
  }, [currentWorkspace?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Main>
      <MainDiv>
        <TopDiv>
          <HeaderDiv>
            <Title>Contact</Title>
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
            {activeTab === 'People' ? (
              <PersonList />
            ) : (
              <CompanyList activeTab={activeTab} />
            )}
          </BottomDiv>
        </div>
      </MainDiv>
    </Main>
  );
};
export default observer(Contact);
