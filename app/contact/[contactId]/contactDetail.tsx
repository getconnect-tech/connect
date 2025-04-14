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
import {
  ContactInfo,
  ContactName,
  ContactEmail,
  ContactPhone,
  ContactAddress,
  ContactCustomTraits,
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
  WorkspaceInfo,
  WorkspaceName,
  WorkspaceDetails,
} from './style';

interface ContactDetailProps {
  contactId: string;
}

const ContactDetailComponent = ({ contactId }: ContactDetailProps) => {
  const [activeTab, setActiveTab] = useState('Open');
  const [currentOpenDropdown, setCurrentOpenDropdown] = useState<string | null>(
    null,
  );
  const [ticketLoading, setTicketLoading] = useState(false);
  const [ticketError, setTicketError] = useState<string | null>(null);
  const tabItem = ['Open', 'Snoozed', 'Done'];
  const { contactStore, workspaceStore } = useStores();
  const { currentWorkspace } = workspaceStore;
  const { currentContact, contactTickets, loading } = contactStore;

  useEffect(() => {
    const loadContactData = async () => {
      if (!isEmpty(currentWorkspace?.id)) {
        setTicketLoading(true);
        setTicketError(null);
        try {
          await contactStore.loadContactDetails(contactId);
        } catch (error: any) {
          console.error('Error loading contact details:', error);
          setTicketError(error.message || 'Failed to load contact details');
        } finally {
          setTicketLoading(false);
        }
      } else {
        setTicketError(
          'No workspace selected. Please select a workspace first.',
        );
      }
    };

    loadContactData();

    return () => {
      contactStore.clearContactDetails();
    };
  }, [contactId, currentWorkspace?.id, contactStore]);

  const displayTicketList = useCallback(() => {
    const currentTime = new Date();
    return contactTickets.filter((ticket: Ticket) => {
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
  }, [contactTickets, activeTab]);

  if (loading) {
    return <InboxLoading />;
  }

  if (!currentContact) {
    return (
      <EmptyState
        iconName='user-icon'
        iconSize='20'
        iconViewBox='0 0 12 12'
        title='Contact not found'
        description="The contact you're looking for doesn't exist or has been removed."
      />
    );
  }

  return (
    <Main>
      <MainDiv>
        <SplitViewContainer>
          <LeftPanel>
            <ContactInfo>
              <ContactName>{currentContact.name}</ContactName>
              {currentContact.email && (
                <ContactEmail>{currentContact.email}</ContactEmail>
              )}
              {currentContact.phone && (
                <ContactPhone>{currentContact.phone}</ContactPhone>
              )}
              {currentContact.address && (
                <ContactAddress>
                  {Object.entries(currentContact.address)
                    .filter(([, value]) => value)
                    .map(([key, value]) => (
                      <div key={key}>
                        {key}: {String(value)}
                      </div>
                    ))}
                </ContactAddress>
              )}
              {currentContact.custom_traits && (
                <ContactCustomTraits>
                  {Object.entries(currentContact.custom_traits)
                    .filter(([, value]) => value)
                    .map(([key, value]) => (
                      <div key={key}>
                        {key}: {String(value)}
                      </div>
                    ))}
                </ContactCustomTraits>
              )}
              {currentContact.groups && currentContact.groups.length > 0 && (
                <WorkspaceInfo>
                  <WorkspaceName>Group Information</WorkspaceName>
                  <WorkspaceDetails>
                    {currentContact.groups.map((group) => (
                      <div key={group.id}>
                        <div>Name: {group.name}</div>
                        {group.group_label && (
                          <div>Label: {group.group_label}</div>
                        )}
                        {group.contacts_count !== undefined && (
                          <div>Contacts: {group.contacts_count}</div>
                        )}
                        <div>Open Tickets: {group.ticketsCount.OPEN || 0}</div>
                        <div>
                          Closed Tickets: {group.ticketsCount.CLOSED || 0}
                        </div>
                        <hr style={{ margin: '8px 0' }} />
                      </div>
                    ))}
                  </WorkspaceDetails>
                </WorkspaceInfo>
              )}
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
                  description={`No ${activeTab.toLowerCase()} tickets for this contact.`}
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

// Create a client-side wrapper component
const ClientContactDetailComponent = observer(ContactDetailComponent);

// Export the client component
export default ClientContactDetailComponent;
