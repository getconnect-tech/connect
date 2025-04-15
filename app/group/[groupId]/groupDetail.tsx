'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { MessageType, TicketStatus } from '@prisma/client';
import { useStores } from '@/stores';
import { Ticket } from '@/utils/dataTypes';
import InboxCard from '@/components/inboxCard/inboxCard';
import CustomContextMenu from '@/components/contextMenu/contextMenu';
import EmptyState from '@/components/emptyState/emptyState';
import InboxLoading from '@/components/inboxLoading/inboxLoading';
import { isEmpty } from '@/helpers/common';
import ContactCard from '@/components/contactCard/contactCard';
import {
  ContactInfo,
  GroupName,
  GroupLabel,
  GroupStats,
  StatItem,
  GroupCustomTraits,
  SplitViewContainer,
  LeftPanel,
  RightPanel,
  Tab,
  TabDiv,
  Title,
  HeaderDiv,
  Main,
  MainDiv,
  TopDiv,
  BottomDiv,
  ContactsSection,
  ContactsTitle,
  ContactsList,
} from './style';

interface GroupDetailProps {
  groupId: string;
}

const GroupDetailComponent = ({ groupId }: GroupDetailProps) => {
  const [activeTab, setActiveTab] = useState('Open');
  const [currentOpenDropdown, setCurrentOpenDropdown] = useState<string | null>(
    null,
  );
  const [ticketLoading, setTicketLoading] = useState(false);
  const [ticketError, setTicketError] = useState<string | null>(null);
  const tabItem = ['Open', 'Snoozed', 'Done'];
  const { groupStore, workspaceStore } = useStores();
  const { currentWorkspace } = workspaceStore;
  const { groupDetails, loading } = groupStore;

  useEffect(() => {
    const loadGroupData = async () => {
      if (!isEmpty(currentWorkspace?.id)) {
        setTicketLoading(true);
        setTicketError(null);
        try {
          await groupStore.loadGroupDetails(groupId);
        } catch (error: any) {
          console.error('Error loading group details:', error);
          setTicketError(error.message || 'Failed to load group details');
        } finally {
          setTicketLoading(false);
        }
      } else {
        setTicketError(
          'No workspace selected. Please select a workspace first.',
        );
      }
    };

    loadGroupData();

    return () => {
      groupStore.clearGroupDetails();
    };
  }, [groupId, currentWorkspace?.id, groupStore]);

  const displayTicketList = useCallback(() => {
    if (!groupDetails?.tickets) return [];

    const currentTime = new Date();
    return groupDetails.tickets.filter((ticket: Ticket) => {
      switch (activeTab) {
        case 'Open':
          return (
            ticket.status === TicketStatus.OPEN &&
            (isEmpty(ticket?.snooze_until) ||
              (ticket.snooze_until &&
                new Date(ticket.snooze_until) < currentTime))
          );
        case 'Snoozed':
          return (
            ticket.status === TicketStatus.OPEN &&
            ticket.snooze_until &&
            new Date(ticket.snooze_until) > currentTime
          );
        case 'Done':
          return ticket.status === TicketStatus.CLOSED;
        default:
          return true;
      }
    });
  }, [groupDetails?.tickets, activeTab]);

  if (loading) {
    return <InboxLoading />;
  }

  if (!groupDetails) {
    return (
      <EmptyState
        iconName='group-icon'
        iconSize='20'
        iconViewBox='0 0 12 12'
        title='Group not found'
        description="The group you're looking for doesn't exist or has been removed."
      />
    );
  }

  return (
    <Main>
      <MainDiv>
        <SplitViewContainer>
          <LeftPanel>
            <ContactInfo>
              <GroupName>{groupDetails.name}</GroupName>
              {groupDetails.group_label && (
                <GroupLabel>{groupDetails.group_label}</GroupLabel>
              )}
              <GroupStats>
                <StatItem>
                  <span>{groupDetails.contacts.length}</span> contacts
                </StatItem>
                <StatItem>
                  <span>
                    {groupDetails.tickets?.filter(
                      (ticket: Ticket) =>
                        ticket.status === TicketStatus.OPEN &&
                        (!ticket.snooze_until ||
                          new Date(ticket.snooze_until) < new Date()),
                    ).length || 0}
                  </span>{' '}
                  open tickets
                </StatItem>
                <StatItem>
                  <span>
                    {groupDetails.tickets?.filter(
                      (ticket: Ticket) => ticket.status === TicketStatus.CLOSED,
                    ).length || 0}
                  </span>{' '}
                  closed tickets
                </StatItem>
              </GroupStats>
              {groupDetails.custom_traits && (
                <GroupCustomTraits>
                  {Object.entries(groupDetails.custom_traits)
                    .filter(([, value]) => value)
                    .map(([key, value]) => (
                      <div key={key}>
                        {key}: {String(value)}
                      </div>
                    ))}
                </GroupCustomTraits>
              )}
              <ContactsSection>
                <ContactsTitle>Contacts in this group</ContactsTitle>
                <ContactsList>
                  {groupDetails.contacts.map((contact) => (
                    <ContactCard
                      key={contact.id}
                      imgSrc={contact.avatar || ''}
                      name={contact.name}
                      email={contact.email}
                      isShowNavbar={false}
                      showTicketCount={false}
                    />
                  ))}
                </ContactsList>
              </ContactsSection>
            </ContactInfo>
          </LeftPanel>
          <RightPanel>
            <TopDiv>
              <HeaderDiv>
                <Title>Tickets</Title>
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
              {ticketLoading ? (
                <InboxLoading />
              ) : ticketError ? (
                <EmptyState
                  iconName='error-icon'
                  iconSize='20'
                  iconViewBox='0 0 12 12'
                  title='Error loading tickets'
                  description={ticketError}
                />
              ) : displayTicketList().length === 0 ? (
                <EmptyState
                  iconName='inbox-icon'
                  iconSize='20'
                  iconViewBox='0 0 12 12'
                  title='No tickets found'
                  description={`No ${activeTab.toLowerCase()} tickets for this group.`}
                />
              ) : (
                displayTicketList().map((ticket: Ticket, index: number) => (
                  <CustomContextMenu
                    key={ticket.id}
                    ticketDetail={ticket}
                    ticketIndex={index}
                  >
                    <div>
                      <InboxCard
                        ticketDetail={ticket}
                        description={ticket.last_message?.content || ''}
                        showDotIcon={!ticket.has_read}
                        src=''
                        currentOpenDropdown={currentOpenDropdown}
                        setCurrentOpenDropdown={setCurrentOpenDropdown}
                        dropdownIdentifier={`card-${ticket.id}`}
                        ticketIndex={index}
                        isShowNavbar={false}
                        isAwaiting={
                          ticket.last_message?.type === MessageType.FROM_CONTACT
                        }
                      />
                    </div>
                  </CustomContextMenu>
                ))
              )}
            </BottomDiv>
          </RightPanel>
        </SplitViewContainer>
      </MainDiv>
    </Main>
  );
};

export default observer(GroupDetailComponent);
