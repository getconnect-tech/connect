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
import { Main } from '@/app/contact/style';
import DetailsSection from '@/app/contact/[contact_id]/detailsSection';
import InboxLoading from '@/components/inboxLoading/inboxLoading';
import { useStores } from '@/stores';
import { getGroupDetails } from '@/services/clientSide/contactServices';
import { formatWorkspaceDetails, isEmpty } from '@/helpers/common';
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

interface Props {
  company_id: string;
}

function CompanyDetail(props: Props) {
  const { company_id } = props;
  const router = useRouter();
  const [isNavbar, setIsNavbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Open');
  const [currentOpenDropdown, setCurrentOpenDropdown] = useState<string | null>(
    null,
  );

  // Mobx store variables
  const { workspaceStore, contactStore } = useStores();
  const { currentWorkspace } = workspaceStore || {};
  const { groupDetails } = contactStore || {};

  const onCloseNavbar = useCallback(() => {
    setIsNavbar(false);
  }, []);

  const workspaceItemDetail = useMemo(
    () => formatWorkspaceDetails(groupDetails),
    [groupDetails],
  );

  const loadData = useCallback(async () => {
    setLoading(true);
    if (!isEmpty(currentWorkspace?.id)) {
      await getGroupDetails(company_id);
    }
    setLoading(false);
  }, [company_id, currentWorkspace?.id]);

  useEffect(() => {
    loadData();
    return () => {
      contactStore.setGroupDetails(null);
    };
  }, [loadData, contactStore]);

  const renderWorkSpace = useMemo(() => {
    return (
      <>
        {groupDetails?.contacts.map((item) => (
          <ItemDiv key={item.name}>
            <Avatar
              imgSrc={item.avatar || ''}
              name={item.name}
              size={28}
              isShowBorder
            />
            <div>
              <Value>{item.name}</Value>
              <EmailValue>{item.email}</EmailValue>
            </div>
          </ItemDiv>
        ))}
      </>
    );
  }, [groupDetails?.contacts]);

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
        {groupDetails &&
          groupDetails?.tickets?.length > 0 &&
          groupDetails?.tickets?.map((ticket, index) => (
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
                    src={ticket?.contact.avatar || ''}
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
  }, [currentOpenDropdown, groupDetails, isNavbar]);

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
              imgSrc={groupDetails?.avatar || ''}
              name={groupDetails?.name || ''}
              size={28}
              isShowBorder
            />
            <Name>{groupDetails?.name}</Name>
          </NameSection>
          <DetailsSection
            title={'Workspace details'}
            detailItem={workspaceItemDetail}
            isCompany={true}
          />
          <WorkSpaceSection>
            <TitleSection>
              <Title className='workspace-title'>Contacts</Title>
              <CountingText>{groupDetails?.contacts.length}</CountingText>
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
              {loading &&
                (!groupDetails || groupDetails?.tickets?.length === 0) && (
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

export default observer(CompanyDetail);
