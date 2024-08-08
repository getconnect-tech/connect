/* eslint-disable max-len */
'use client';
import React, { useState } from 'react';
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

function Inbox() {
  const [activeTab, setActiveTab] = useState('Open');
  const tabItem = ['Open', 'Snoozed', 'Done'];

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
          <CustomContextMenu>
            <div>
              <InboxCard
                name={'Bhavdip Patel from Google'}
                title={'Regarding app subscription issues from appsumo'}
                description={
                  'Complete your registration to activate your teamcamp subscription Complete your registration to activate your teamcamp subscription...'
                }
                time={'3 min ago'}
                showDotIcon={true}
                src={
                  'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4'
                }
              />
            </div>
          </CustomContextMenu>
          <CustomContextMenu>
            <div>
              <InboxCard
                name={'Bhavdip Patel from Google'}
                title={'Regarding app subscription issues from appsumo'}
                description={
                  'Complete your registration to activate your teamcamp subscription Complete your registration to activate your teamcamp subscription...'
                }
                time={'10 min ago'}
                src={
                  'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4'
                }
              />
            </div>
          </CustomContextMenu>
        </BottomDiv>
      </MainDiv>
    </Main>
  );
}

export default observer(Inbox);
