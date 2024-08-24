'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { TicketStatus } from '@prisma/client';
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
import InboxCard from '@/components/inboxCard/inboxCard';
import CustomContextMenu from '@/components/contextMenu/contextMenu';
import { getTicketList } from '@/services/clientSide/ticketServices';
import { useStores } from '@/stores';
import { isEmpty } from '@/helpers/common';
import EmptyState from '@/components/emptyState/emptyState';
import InboxLoading from '@/components/inboxLoading/inboxLoading';

function Inbox() {
  const [activeTab, setActiveTab] = useState('Open');
  const tabItem = ['Open', 'Snoozed', 'Done'];
  const [currentOpenDropdown, setCurrentOpenDropdown] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState(true); // Loading state added
  const { workspaceStore, ticketStore } = useStores();
  const { currentWorkspace } = workspaceStore;
  const { ticketList } = ticketStore;

  const loadData = useCallback(async () => {
    if (!isEmpty(currentWorkspace?.id)) {
      setLoading(true); // Set loading to true before fetching data
      try {
        await getTicketList();
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    }
  }, [currentWorkspace?.id]);

  // Filter ticket based on activeTab
  const filteredTicketList = ticketList?.filter((ticket) => {
    switch (activeTab) {
      case 'Open':
        return ticket.status === TicketStatus.OPEN;
      case 'Snoozed':
        return ticket.status === TicketStatus.SNOOZE;
      case 'Done':
        return ticket.status === TicketStatus.CLOSED;
      default:
        return false;
    }
  });

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Main>
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
        <div style={{ padding: '0 20px' }}>
          <BottomDiv>
            {loading && (!ticketList || ticketList?.length === 0) && (
              <InboxLoading />
            )}
            {!loading && (!ticketList || ticketList?.length === 0) && (
              <EmptyState
                iconName='inbox-icon'
                iconSize='20'
                iconViewBox='0 0 12 12'
                title='Your inbox is empty now.'
                // eslint-disable-next-line max-len
                description='This is where you will receive notifications for all types of tickets. Enjoy your clutter-free inbox!'
              />
            )}
            {filteredTicketList?.length > 0 &&
              filteredTicketList.map((ticket, index) => (
                <>
                  <CustomContextMenu
                    key={ticket.id}
                    ticketDetail={ticket}
                    ticketIndex={index}
                  >
                    <div>
                      <InboxCard
                        ticketDetail={ticket}
                        description='Complete your registration...'
                        showDotIcon={true}
                        src=''
                        currentOpenDropdown={currentOpenDropdown}
                        setCurrentOpenDropdown={setCurrentOpenDropdown}
                        dropdownIdentifier={`card-${ticket.id}`}
                        loadData={loadData}
                        ticketIndex={index}
                      />
                    </div>
                  </CustomContextMenu>
                </>
              ))}
          </BottomDiv>
        </div>
      </MainDiv>
    </Main>
  );
}

export default observer(Inbox);
