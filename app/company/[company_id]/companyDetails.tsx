/* eslint-disable max-len */
'use client';
import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageType } from '@prisma/client';
import ResponsiveNavbar from '@/components/navbar/ResponsiveNavbar';
import Avatar from '@/components/avtar/Avtar';
import Icon from '@/components/icon/icon';
import { ticketStore } from '@/stores/ticketStore';
import CustomContextMenu from '@/components/contextMenu/contextMenu';
import InboxCard from '@/components/inboxCard/inboxCard';
import { Main } from '@/app/contact/style';
import DetailsSection from '@/app/contact/[contact_id]/detailsSection';
import {
  BottomDiv,
  CountingText,
  EmailValue,
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
  TitleSection,
  TopDiv,
  Value,
  WorkspaceItemSection,
  WorkSpaceSection,
} from './style';

function CompanyDetail() {
  const router = useRouter();
  const [isNavbar, setIsNavbar] = useState(false);
  const [activeTab, setActiveTab] = useState('Open');
  const { filteredTicketList } = ticketStore;
  const [currentOpenDropdown, setCurrentOpenDropdown] = useState<string | null>(
    null,
  );

  const onCloseNavbar = useCallback(() => {
    setIsNavbar(false);
  }, []);

  const workspaceItemDetail = [
    { label: 'Name', value: 'Pixer digital' },
    { label: 'Group Label', value: 'Workspace' },
    { label: 'Tasks', value: '0' },
    { label: 'Projects', value: '1' },
    { label: 'Active Users', value: '1' },
    { label: 'Active Subscription', value: '0' },
  ];

  const contacts = [
    {
      imgSrc:
        'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUser%20Image_1716282098691.jpg?alt=media&token=34984821-78db-4248-94c8-35f186397d7e',
      name: 'Pixer digital',
      email: 'pixerdigital@gmail.com',
    },
    {
      imgSrc:
        'https://firebasestorage.googleapis.com/v0/b/getconnect-tech.appspot.com/o/workspaces%2Fdba2c304-49b9-4f95-ac63-a74729b85a6e%2Fworkspace_profile%2Fimage_1726562412931.jpeg?alt=media&token=4e82e81b-56b5-4fcf-b3bc-bb6d907554e0',
      name: 'Teamcamp',
      email: 'teamcamp@gmail.com',
    },
  ];
  const renderWorkSpace = useMemo(() => {
    return (
      <>
        {contacts.map((item) => (
          <ItemDiv key={item.name}>
            <Avatar imgSrc={item.imgSrc} name={''} size={28} isShowBorder />
            <div>
              <Value>{item.name}</Value>
              <EmailValue>{item.email}</EmailValue>
            </div>
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
              imgSrc='https://firebasestorage.googleapis.com/v0/b/getconnect-tech.appspot.com/o/workspaces%2Fdba2c304-49b9-4f95-ac63-a74729b85a6e%2Fworkspace_profile%2Fimage_1726562412931.jpeg?alt=media&token=4e82e81b-56b5-4fcf-b3bc-bb6d907554e0'
              name={''}
              size={28}
              isShowBorder
            />
            <Name>Company</Name>
          </NameSection>
          <DetailsSection
            title={'Workspace details'}
            detailItem={workspaceItemDetail}
            isCompany={true}
          />
          <WorkSpaceSection>
            <TitleSection>
              <Title className='workspace-title'>Contacts</Title>
              <CountingText>{contacts.length}</CountingText>
            </TitleSection>
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

export default CompanyDetail;
