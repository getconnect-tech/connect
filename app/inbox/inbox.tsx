/* eslint-disable indent */
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { usePathname } from 'next/navigation';
import moment from 'moment';
import { TicketStatus } from '@prisma/client';
import {
  BottomDiv,
  HeaderDiv,
  IconAndTitle,
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
import { NAVBAR, TICKETS_HEADER } from '@/global/constants';
import OverdueCard from '@/components/overdueCard/overdueCard';
import UserPreferenceSingleton from '@/helpers/userPreferenceSingleton';
import Icon from '@/components/icon/icon';
import ResponsiveNavbar from '@/components/navbar/ResponsiveNavbar';
import NotificationCard from '@/components/notificationCard/notificationCard';

interface InboxProps {
  activeNav?: number;
  labelId?: string;
}
function Inbox({ activeNav, labelId }: InboxProps) {
  const [activeTab, setActiveTab] = useState('Open');
  const tabItem = ['Open', 'Snoozed', 'Done'];
  const [currentOpenDropdown, setCurrentOpenDropdown] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState(true); // Loading state added
  const [toShowNotificationCard, setToShowNotificationCard] = useState(true);
  const [overDueCardDismissed, setOverDueCardDismissed] = useState(false);
  const { workspaceStore, ticketStore, userStore, settingStore } = useStores();
  const { currentWorkspace } = workspaceStore;
  const { ticketList, filteredTicketList } = ticketStore;
  const { user } = userStore || {};
  const { labels } = settingStore || {};
  const currentLabel = labels?.find((label) => label.id === labelId);
  const [isNavbar, setIsNavbar] = useState(false);
  const pathname = usePathname();
  const countOfUnassignOpenTicket = ticketList?.filter(
    (ticket) =>
      ticket.status === TicketStatus.OPEN && ticket.assigned_to === null,
  );

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

  const shouldShowNotificationCard = useCallback(() => {
    const hasNotificationPermission = Notification.permission === 'granted';
    if (hasNotificationPermission) {
      setToShowNotificationCard(!hasNotificationPermission);
    } else {
      const enableNotification =
        UserPreferenceSingleton.getInstance().getEnableNotification();
      const currentTime = moment();
      const dismissTime = moment(enableNotification);
      setToShowNotificationCard(currentTime.isAfter(dismissTime));
    }
  }, []);

  const shouldShowOverdueCard = useCallback(() => {
    const unAssignedDismissTime =
      UserPreferenceSingleton.getInstance().getAssignedDismiss();
    if (unAssignedDismissTime) {
      const currentTime = moment();
      const dismissTime = moment(unAssignedDismissTime);
      setOverDueCardDismissed(!currentTime.isAfter(dismissTime));
    }
  }, []);

  const displayTicketList = useCallback(() => {
    // Filter ticket based on activeTab
    let filteredTickets = ticketList;
    if (activeNav === NAVBAR.INBOX && user) {
      // Show tickets assigned to the current user
      filteredTickets = ticketList.filter(
        (ticket) => ticket.assigned_to === user.id,
      );
    } else if (activeNav === NAVBAR.UNASSIGNED) {
      filteredTickets = ticketList.filter(
        (ticket) => ticket.assigned_to === null,
      );
    } else if (activeNav === NAVBAR.All_TICKET) {
      // Show all tickets
    } else if (labelId) {
      // Show ticket based on label
      filteredTickets = ticketList.filter((ticket) => {
        if (ticket.labels && ticket.labels.length > 0) {
          return ticket.labels.some((label) => label.id === labelId);
        }
        return false;
      });
    }

    ticketStore.setFilteredTicketList(activeTab, filteredTickets);
  }, [activeTab, activeNav, ticketList, user, ticketStore]);

  const onClickDismiss = () => {
    const futureTime = moment().add(24, 'hours').toISOString();
    UserPreferenceSingleton.getInstance().setAssignedDismiss(futureTime);
    setOverDueCardDismissed(true);
  };

  const onClickEnableNotification = () => {
    const futureNotificationTime = moment().add(7, 'days').toISOString();
    UserPreferenceSingleton.getInstance().setEnableNotification(
      futureNotificationTime,
    );
    setToShowNotificationCard(false);
  };

  useEffect(() => {
    displayTicketList();
  }, [activeTab, ticketList]);

  useEffect(() => {
    loadData();
    shouldShowOverdueCard();
    shouldShowNotificationCard();
  }, [loadData]);

  const onClickIcon = useCallback(() => {
    setIsNavbar(true);
  }, []);

  const onCloseNavbar = useCallback(() => {
    setIsNavbar(false);
  }, []);

  return (
    <Main>
      {isNavbar && <ResponsiveNavbar onClose={onCloseNavbar} />}
      <MainDiv>
        <TopDiv>
          <HeaderDiv>
            <IconAndTitle>
              <Icon
                iconName='sidebar-icon'
                iconSize='16'
                iconViewBox='0 0 16 16'
                className='sidebar-icon'
                onClick={onClickIcon}
              />
              <Title>
                {activeNav ? TICKETS_HEADER[activeNav] : currentLabel?.name}
              </Title>
            </IconAndTitle>
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
        <div style={{ padding: '0 16px' }} onClick={onCloseNavbar}>
          <BottomDiv>
            {loading &&
              (!filteredTicketList || filteredTicketList?.length === 0) && (
                <InboxLoading />
              )}
            {(!loading || filteredTicketList?.length > 0) &&
              toShowNotificationCard && (
                <NotificationCard
                  isShowNavbar={isNavbar}
                  onClose={onClickEnableNotification}
                />
              )}
            {(!loading || filteredTicketList?.length > 0) &&
              countOfUnassignOpenTicket?.length > 0 &&
              !overDueCardDismissed &&
              pathname === '/inbox' && (
                <OverdueCard
                  countAssign={countOfUnassignOpenTicket?.length}
                  onClickDismiss={onClickDismiss}
                  isShowNavbar={isNavbar}
                />
              )}
            {!loading &&
              (!filteredTicketList || filteredTicketList?.length === 0) && (
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
                        description={ticket.last_message?.content || ''}
                        showDotIcon={!ticket?.has_read}
                        src=''
                        currentOpenDropdown={currentOpenDropdown}
                        setCurrentOpenDropdown={setCurrentOpenDropdown}
                        dropdownIdentifier={`card-${ticket.id}`}
                        loadData={loadData}
                        ticketIndex={index}
                        isShowNavbar={isNavbar}
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
