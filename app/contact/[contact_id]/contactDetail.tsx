/* eslint-disable max-len */
'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageType } from '@prisma/client';
import { observer } from 'mobx-react-lite';
import ResponsiveNavbar from '@/components/navbar/ResponsiveNavbar';
import Avatar from '@/components/avtar/Avtar';
import Icon from '@/components/icon/icon';
import CustomContextMenu from '@/components/contextMenu/contextMenu';
import InboxCard from '@/components/inboxCard/inboxCard';
import {
  getContactRecord,
  getContactTicket,
} from '@/services/clientSide/contactServices';
import { isEmpty } from '@/helpers/common';
import { useStores } from '@/stores';
import InboxLoading from '@/components/inboxLoading/inboxLoading';
import { GroupData } from '@/utils/dataTypes';
import EmptyState from '@/components/emptyState/emptyState';
import { Main } from '../style';
import {
  BottomDiv,
  HeaderDiv,
  IconAndTitle,
  ItemDiv,
  LeftProfileSection,
  MainDiv,
  Name,
  NameSection,
  RightSideSection,
  Tab,
  TabDiv,
  Title,
  TopDiv,
  Value,
  WorkspaceItemSection,
  WorkSpaceSection,
} from './style';
import DetailsSection from './detailsSection';

interface Props {
  contact_id: string;
}

function ContactDetail(props: Props) {
  const { contact_id } = props;
  const router = useRouter();
  const [isNavbar, setIsNavbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Open');

  // Mobx store variables
  const { workspaceStore, contactStore } = useStores();
  const { currentWorkspace } = workspaceStore || {};
  const { contactRecord, contactTicket } = contactStore || {};
  const [currentOpenDropdown, setCurrentOpenDropdown] = useState<string | null>(
    null,
  );

  const onCloseNavbar = useCallback(() => {
    setIsNavbar(false);
  }, []);

  const personalDetail = [
    { label: 'Email', value: contactRecord?.email || '' },
    { label: 'Phone', value: contactRecord?.phone || '' },
  ];

  const loadData = useCallback(async () => {
    setLoading(true);
    if (!isEmpty(currentWorkspace?.id)) {
      await Promise.all([
        getContactRecord(contact_id),
        getContactTicket(contact_id),
      ]);
    }
    setLoading(false);
  }, [contact_id, currentWorkspace?.id]);

  useEffect(() => {
    loadData();
    return () => {
      contactStore.setContactRecord(null);
      contactStore.setContactTicket(null);
    };
  }, [loadData, contactStore]);

  const renderWorkSpace = useCallback((groupList: GroupData[]) => {
    return (
      <>
        {groupList?.map((item) => (
          <ItemDiv key={item?.id}>
            <Avatar
              imgSrc={item?.avatar || ''}
              name={item.name || ''}
              size={20}
            />
            <Value>{item?.name}</Value>
          </ItemDiv>
        ))}
      </>
    );
  }, []);

  const renderTabItem = useMemo(() => {
    const tabItem = ['Open', 'Snoozed', 'Done'];
    return (
      <>
        {tabItem.map((tab) => (
          <Tab
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Tab>
        ))}
      </>
    );
  }, [activeTab]);

  const filterTicketsByStatus = useCallback(() => {
    if (!contactTicket) return [];

    return contactTicket.filter((ticket) => {
      const currentTime = new Date();

      switch (activeTab) {
        case 'Open':
          return (
            ticket.status === 'OPEN' &&
            (!ticket.snooze_until ||
              new Date(ticket.snooze_until) < currentTime)
          );
        case 'Snoozed':
          return (
            ticket.snooze_until && new Date(ticket.snooze_until) > currentTime
          );
        case 'Done':
          return ticket.status === 'CLOSED';
        default:
          return true;
      }
    });
  }, [contactTicket, activeTab]);

  const renderTickets = useMemo(() => {
    const filteredTickets = filterTicketsByStatus();

    return (
      <>
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket, index) => (
            <CustomContextMenu
              key={ticket.id}
              ticketDetail={ticket}
              ticketIndex={index}
            >
              <div>
                <InboxCard
                  ticketDetail={ticket}
                  description={ticket.last_message?.content || ''}
                  showDotIcon={!ticket?.has_read}
                  src=''
                  currentOpenDropdown={currentOpenDropdown}
                  setCurrentOpenDropdown={setCurrentOpenDropdown}
                  dropdownIdentifier={`card-${ticket.id}`}
                  ticketIndex={index}
                  isShowNavbar={isNavbar}
                  isAwaiting={
                    ticket.last_message.type === MessageType.FROM_CONTACT
                  }
                />
              </div>
            </CustomContextMenu>
          ))
        ) : (
          <EmptyState
            iconName='inbox-icon'
            iconSize='20'
            iconViewBox='0 0 12 12'
            title='No tickets found'
            description='There are no tickets in this status.'
          />
        )}
      </>
    );
  }, [contactTicket, currentOpenDropdown, isNavbar, filterTicketsByStatus]);

  return (
    <Main>
      {isNavbar && <ResponsiveNavbar onClose={onCloseNavbar} />}
      <MainDiv>
        <LeftProfileSection>
          <NameSection>
            <Icon
              onClick={() => {
                router.push('/contact');
              }}
              iconName='back-icon'
              iconSize='12'
              iconViewBox='0 0 16 16'
              size={true}
            />
            <Avatar
              imgSrc={contactRecord?.avatar || ''}
              name={contactRecord?.name || ''}
              size={28}
              isShowBorder
            />
            <Name>{contactRecord?.name}</Name>
          </NameSection>
          <DetailsSection
            title={'Personal details'}
            detailItem={personalDetail}
          />
          {contactRecord &&
            contactRecord?.groups?.length > 0 &&
            contactRecord?.groups?.map((groupList) => {
              return (
                <WorkSpaceSection key={groupList.name}>
                  <Title className='workspace-title'>{groupList?.name}</Title>
                  <WorkspaceItemSection>
                    {renderWorkSpace(groupList.list as GroupData[])}
                  </WorkspaceItemSection>
                </WorkSpaceSection>
              );
            })}
        </LeftProfileSection>
        <RightSideSection>
          <TopDiv>
            <HeaderDiv>
              <IconAndTitle>
                <Title>All tickets</Title>
              </IconAndTitle>
              <TabDiv>{renderTabItem}</TabDiv>
            </HeaderDiv>
          </TopDiv>
          <div style={{ padding: '0 16px' }} onClick={onCloseNavbar}>
            <BottomDiv>
              {loading && (!contactTicket || contactTicket?.length === 0) && (
                <InboxLoading />
              )}
              {renderTickets}
            </BottomDiv>
          </div>
        </RightSideSection>
      </MainDiv>
    </Main>
  );
}

export default observer(ContactDetail);
