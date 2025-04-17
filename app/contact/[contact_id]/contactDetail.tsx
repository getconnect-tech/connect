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
  const [activeTab, setActiveTab] = useState('Open');

  // Mobx store variables
  const { workspaceStore, contactStore } = useStores();
  const { currentWorkspace } = workspaceStore || {};
  const { contactRecord, contactTicket } = contactStore || {};
  const [currentOpenDropdown, setCurrentOpenDropdown] = useState<string | null>(
    null,
  );

  console.log('contactTicket', contactTicket);

  const onCloseNavbar = useCallback(() => {
    setIsNavbar(false);
  }, []);

  const personalDetail = [
    { label: 'Email', value: contactRecord?.email || '' },
    { label: 'Phone', value: contactRecord?.phone || '' },
  ];

  const loadData = useCallback(async () => {
    if (!isEmpty(currentWorkspace?.id)) {
      await Promise.all([
        getContactRecord(contact_id),
        getContactTicket(contact_id),
      ]);
    }
  }, [contact_id, currentWorkspace?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    return () => {
      contactStore.setContactRecord(null);
    };
  }, [contactStore]);

  const renderWorkSpace = useMemo(() => {
    return (
      <>
        {contactRecord?.groups?.map((item) => (
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
  }, [contactRecord?.groups]);

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

  const renderTickets = useMemo(() => {
    return (
      <>
        {contactTicket &&
          contactTicket?.length > 0 &&
          contactTicket?.map((ticket, index) => (
            <>
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
            </>
          ))}
      </>
    );
  }, [contactTicket, currentOpenDropdown, isNavbar]);

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
          <WorkSpaceSection>
            <Title className='workspace-title'>Workspaces</Title>
            <WorkspaceItemSection>{renderWorkSpace}</WorkspaceItemSection>
          </WorkSpaceSection>
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
              {/* {loading &&
                (!filteredTicketList || filteredTicketList?.length === 0) && (
                  <InboxLoading />
                )} */}
              {renderTickets}
            </BottomDiv>
          </div>
        </RightSideSection>
      </MainDiv>
    </Main>
  );
}

export default observer(ContactDetail);
