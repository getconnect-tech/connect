/* eslint-disable max-len */
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
import NavbarPage from '@/components/navbar';
import InboxCard from '@/components/inboxCard/inboxCard';
import CustomContextMenu from '@/components/contextMenu/contextMenu';
import { getTicketList } from '@/services/clientSide/ticketServices';
import { useStores } from '@/stores';
import { isEmpty } from '@/helpers/common';

function Inbox() {
  const [activeTab, setActiveTab] = useState('Open');
  const tabItem = ['Open', 'Snoozed', 'Done'];
  const { workspaceStore, ticketStore } = useStores();
  const { currentWorkspace } = workspaceStore;
  const { ticketList } = ticketStore;

  const loadData = useCallback(async () => {
    if (!isEmpty(currentWorkspace?.id)) {
      await getTicketList();
    }
  }, [currentWorkspace?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const statuses1 = [
    { title: 'Question', isName: false, iconName: 'question-icon' },
    { title: 'Priority', isName: false, iconName: 'inbox-icon' },
    {
      title: 'Unassigned',
      isName: true,
      avatarUrl:
        'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4',
    },
  ];

  return (
    <Main>
      <NavbarPage />
      <MainDiv>
        <TopDiv>
          <HeaderDiv>
            <Title>Inbox</Title>
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
        <BottomDiv>
          {/* Render Ticker List */}
          {ticketList?.map((ticket) => (
            <CustomContextMenu>
              <div>
                {/* Use Inbox card component for show tickets */}
                <InboxCard
                  ticketDetail={ticket}
                  description={'Complete your registration...'}
                  showDotIcon={true}
                  status={statuses1}
                  src={''}
                />
              </div>
            </CustomContextMenu>
          ))}
        </BottomDiv>
      </MainDiv>
    </Main>
  );
}

export default observer(Inbox);
