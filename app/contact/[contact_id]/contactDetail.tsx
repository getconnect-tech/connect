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
import { getContactRecord } from '@/services/clientSide/contactServices';
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
  const { ticketStore, workspaceStore, contactStore } = useStores();
  const { currentWorkspace } = workspaceStore || {};
  const { contactRecord } = contactStore || {};
  const { filteredTicketList } = ticketStore;
  const [currentOpenDropdown, setCurrentOpenDropdown] = useState<string | null>(
    null,
  );

  const onCloseNavbar = useCallback(() => {
    setIsNavbar(false);
  }, []);

  console.log('contactRecord', contactRecord);

  const personalDetail = [
    { label: 'Email', value: 'bhavdip.pixer@gmail.com' },
    { label: 'Phone', value: '(628) 225-4852' },
  ];

  const loadData = useCallback(async () => {
    if (!isEmpty(currentWorkspace?.id)) {
      await Promise.all([getContactRecord(contact_id)]);
    }
  }, [contact_id, currentWorkspace?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const renderWorkSpace = useMemo(() => {
    const workspaces = [
      {
        imgSrc:
          'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUser%20Image_1716282098691.jpg?alt=media&token=34984821-78db-4248-94c8-35f186397d7e',
        name: 'Pixer digital',
      },
      {
        imgSrc:
          'https://firebasestorage.googleapis.com/v0/b/getconnect-tech.appspot.com/o/workspaces%2Fdba2c304-49b9-4f95-ac63-a74729b85a6e%2Fworkspace_profile%2Fimage_1726562412931.jpeg?alt=media&token=4e82e81b-56b5-4fcf-b3bc-bb6d907554e0',
        name: 'Teamcamp',
      },
    ];
    return (
      <>
        {workspaces.map((item) => (
          <ItemDiv key={item.name}>
            <Avatar imgSrc={item.imgSrc} name={''} size={20} />
            <Value>{item.name}</Value>
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

  console.log('call');

  const renderTickets = useMemo(() => {
    return (
      <>
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
  }, [currentOpenDropdown, filteredTicketList, isNavbar]);

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
              imgSrc='https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUser%20Image_1716282098691.jpg?alt=media&token=34984821-78db-4248-94c8-35f186397d7e'
              name={''}
              size={28}
              isShowBorder
            />
            <Name>XYZ</Name>
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
