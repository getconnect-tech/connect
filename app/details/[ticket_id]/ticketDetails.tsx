/* eslint-disable max-len */
'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { MessageType, PriorityLevels, TicketStatus } from '@prisma/client';
import moment from 'moment';
import {
  ActivityDiv,
  BottomDiv,
  ButtonDiv,
  CenterDiv,
  HeaderDiv,
  IconDiv,
  Input,
  InputDiv,
  InputIcon,
  LeftDiv,
  LineDiv,
  Main,
  MainDiv,
  Message,
  StatusDiv,
  Title,
  TopDiv,
} from '../style';
import ProfileSection from '@/components/profileSection/profileSection';
import SVGIcon from '@/assets/icons/SVGIcon';
import Avatar from '@/components/avtar/Avtar';
import MessageCard from '@/components/messageCard/messageCard';
import { labelItem, modeItem, priorityItem, snoozeItem } from '@/helpers/raw';
import DropDownWithTag from '@/components/dropDownWithTag/dropDownWithTag';
import { useStores } from '@/stores';
import {
  changeTicketStatus,
  getTicketDetails,
  updateAssignee,
  getTicketMessages,
  updateTicketPriority,
  sendMessage,
} from '@/services/clientSide/ticketServices';
import { capitalizeString, getUniqueId, isEmpty } from '@/helpers/common';
import Icon from '@/components/icon/icon';
import RichTextBox from '@/components/commentBox';
import { DropDownItem } from '@/components/dropDown/dropDown';
import Tag from '@/components/tag/tag';
import { MessageDetails } from '@/utils/dataTypes';
import AssigneeDropdown from '@/components/AssigneeDropdown/dropDownWithTag';
import SnoozeDropdown from '@/components/snoozeDropdown/snoozeDropdown';
import InternalMessageCard from '@/components/internalMessageCard/internalMessageCard';
import { colors } from '@/styles/colors';

interface Props {
  ticket_id: string;
}

function TicketDetails(props: Props) {
  const { ticket_id } = props;
  const router = useRouter();
  const [labelDropdown, setLabelDropdown] = useState(false);
  const [priorityDropdown, setPriorityDropdown] = useState(false);
  const [messageModeDropdown, setMessageModeDropdown] = useState(false);
  const [assignDropdown, setAssignDropdown] = useState(false);
  const [snoozeDropdown, setSnoozeDropdown] = useState(false);
  const [commentValue, setCommentValue] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { ticketStore, workspaceStore, userStore } = useStores();
  const { currentWorkspace } = workspaceStore || {};
  const { ticketDetails, messages } = ticketStore || {};
  const { user } = userStore || {};
  const { priority, assigned_to, contact } = ticketDetails || {};
  const [modeSelectedItem, setModeSelectedItem] = useState<DropDownItem>({
    name: 'Email',
    icon: 'email-icon',
  });
  const [submenuPosition, setSubmenuPosition] = useState<
    'upwards' | 'downwards'
  >('upwards');

  const handleModeItemChange = (item: DropDownItem) => {
    setModeSelectedItem(item);
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLElement>,
    // eslint-disable-next-line no-unused-vars
    setPosition: (position: 'upwards' | 'downwards') => void,
  ) => {
    const triggerElement = e.currentTarget;
    const rect = triggerElement.getBoundingClientRect();
    // eslint-disable-next-line no-undef
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < 200 && spaceAbove > 200) {
      setPosition('upwards');
    } else {
      setPosition('downwards');
    }
  };

  const loadData = useCallback(async () => {
    if (!isEmpty(currentWorkspace?.id)) {
      await Promise.all([
        getTicketDetails(ticket_id),
        getTicketMessages(ticket_id),
      ]);
    }
  }, [ticket_id, currentWorkspace?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        block: 'end',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      ticketStore.setTicketDetails(null);
      ticketStore.setTicketMessages([]);
    };
  }, []);

  const handlePriorityTag = () => {
    setPriorityDropdown((prev) => !prev);
    setAssignDropdown(false);
    setLabelDropdown(false);
    setMessageModeDropdown(false);
    setSnoozeDropdown(false);
  };

  const handleSnoozeTag = () => {
    setSnoozeDropdown((prev) => !prev);
    setAssignDropdown(false);
    setLabelDropdown(false);
    setMessageModeDropdown(false);
    setPriorityDropdown(false);
  };

  const handleMessageModeTag = () => {
    setMessageModeDropdown((prev) => !prev);
    setAssignDropdown(false);
    setLabelDropdown(false);
    setPriorityDropdown(false);
    setSnoozeDropdown(false);
  };

  const handleLabelTag = () => {
    setLabelDropdown((prev) => !prev);
    setAssignDropdown(false);
    setPriorityDropdown(false);
    setMessageModeDropdown(false);
    setSnoozeDropdown(false);
  };

  const handleAssignTag = () => {
    setAssignDropdown((prev) => !prev);
    setPriorityDropdown(false);
    setLabelDropdown(false);
    setMessageModeDropdown(false);
    setSnoozeDropdown(false);
  };

  const assignItem = [
    { name: 'Unassigned', icon: 'dropdown-unassign-icon' },
    ...(currentWorkspace?.users?.map((user) => ({
      name: user.display_name || '',
      src: user.profile_url || '',
      isName: true,
      user_id: user.id,
    })) || []),
  ];

  /*
   * @desc Update ticket details priority in ticket details
   */
  const onChangePriority = useCallback(
    async (item: { name: string; icon: string; value: PriorityLevels }) => {
      if (ticketDetails?.priority === item?.value) return;
      const payload = { priority: item?.value };
      try {
        if (ticketDetails?.id) {
          const updatedTicketDetails = {
            ...ticketDetails,
            priority: item?.value,
          };
          ticketStore.setTicketDetails(updatedTicketDetails);
          const result = await updateTicketPriority(ticketDetails?.id, payload);
          if (result) {
            loadData();
          }
        }
      } catch (e) {
        console.log('Error : ', e);
      }
    },
    [ticketDetails],
  );

  /*
   * @desc Update ticket details assign user in ticket details
   */
  const onChangeAssign = useCallback(
    async (item: {
      name: string;
      icon: string;
      value: PriorityLevels;
      user_id: string;
    }) => {
      const payload = { assignee: item?.user_id };
      try {
        if (ticketDetails?.id) {
          const updatedTicketDetails = {
            ...ticketDetails,
            assigned_to: item?.user_id,
          };
          ticketStore.setTicketDetails(updatedTicketDetails);
          const result = await updateAssignee(ticketDetails?.id, payload);
          if (result) {
            loadData();
          }
        }
      } catch (e) {
        console.log('Error : ', e);
      }
    },
    [ticketDetails],
  );
  const assignedUser = currentWorkspace?.users?.find(
    (user: { id: string | null | undefined }) => user.id === assigned_to,
  );

  /*
   * @desc Close ticket
   */
  const handleTicketStatus = useCallback(
    async (status: TicketStatus) => {
      const payload = {
        status,
      };
      try {
        if (ticketDetails?.id) {
          const updatedTicketDetails = {
            ...ticketDetails,
            status,
          };
          ticketStore.setTicketDetails(updatedTicketDetails);
          await changeTicketStatus(ticketDetails?.id, payload);
        }
      } catch (e) {
        console.log('Error : ', e);
      }
    },
    [ticketDetails],
  );
  /*
   * @desc Send comment
   */
  const handleCommentSend = useCallback(
    async (content: string, mode: string) => {
      if (!content || content === '' || content === null) {
        // eslint-disable-next-line no-undef
        alert('Please add message');
        return;
      }
      let type;
      if (mode !== 'Email') {
        type = MessageType.REGULAR;
      } else {
        type = MessageType.EMAIL;
      }
      const payload = { content: content, type };
      const newMessage: MessageDetails = {
        assignee: null,
        author: user,
        author_id: user!.id,
        content,
        id: getUniqueId(),
        created_at: new Date(),
        label: null,
        reference_id: '',
        ticket_id,
        type,
      };

      try {
        if (ticket_id) {
          ticketStore.addTicketMessage(newMessage);
          const result = await sendMessage(ticket_id, payload);
          if (result) {
            setCommentValue('');
          }
        }
      } catch (e) {
        console.log('Error : ', e);
      }
    },
    [ticket_id, user],
  );

  /*
   * @desc Render message based on message type
   */
  const renderActivityMessage = useCallback(
    (message: MessageDetails) => {
      switch (message.type) {
        case MessageType.REGULAR:
          return (
            <ActivityDiv>
              <div className='avtar-internal'>
                <Avatar
                  imgSrc={message?.author?.profile_url || ''}
                  name={message?.author?.display_name || ''}
                  size={20}
                />
              </div>
              <InternalMessageCard
                title={message?.content || ''}
                time={message?.created_at}
              />
            </ActivityDiv>
          );
        case MessageType.FROM_CONTACT:
          return (
            <ActivityDiv>
              <div className='avtar'>
                <Avatar imgSrc={''} name={contact?.name || ''} size={20} />
              </div>
              <MessageCard
                title={'Sanjay send email'}
                time={message?.created_at}
                subTitle={'To Teamcamp Support '}
                message={message.content || ''}
              />
            </ActivityDiv>
          );
        case MessageType.EMAIL:
          return (
            <ActivityDiv>
              <div className='avtar'>
                <Avatar
                  imgSrc={message?.author?.profile_url || ''}
                  name={message?.author?.display_name || ''}
                  size={20}
                />
              </div>
              <MessageCard
                title={`${message?.author?.display_name} send email`}
                time={message?.created_at}
                subTitle={`To ${contact?.email}`}
                message={message.content || ''}
              />
            </ActivityDiv>
          );
        case MessageType.CHANGE_PRIORITY:
          return (
            <ActivityDiv>
              <Avatar
                imgSrc={message?.author?.profile_url || ''}
                name={message?.author?.display_name || ''}
                size={20}
              />
              <Message>
                {message?.author?.display_name || ''}{' '}
                <span>set priority to</span>{' '}
                {capitalizeString(message?.reference_id)}
                <SVGIcon
                  name='dot-icon'
                  width='4'
                  height='4'
                  fill='none'
                  viewBox='0 0 4 4'
                />
                <span>{moment(message?.created_at).fromNow()}</span>
              </Message>
            </ActivityDiv>
          );
        case MessageType.CHANGE_ASSIGNEE:
          return (
            <ActivityDiv>
              <Avatar
                imgSrc={message?.author?.profile_url || ''}
                name={message?.author?.display_name || ''}
                size={20}
              />
              <Message>
                {message?.author?.display_name || ''}{' '}
                <span>assigned this ticket to</span>{' '}
                {message?.assignee?.display_name || ''}
                <SVGIcon
                  name='dot-icon'
                  width='4'
                  height='4'
                  fill='none'
                  viewBox='0 0 4 4'
                />
                <span>{moment(message?.created_at).fromNow()}</span>
              </Message>
            </ActivityDiv>
          );
        case MessageType.CHANGE_STATUS:
          return (
            <ActivityDiv>
              <Avatar
                imgSrc={message?.author?.profile_url || ''}
                name={message?.author?.display_name || ''}
                size={20}
              />
              <Message>
                {message?.author?.display_name || ''}{' '}
                <span>changed ticket status to</span>{' '}
                {capitalizeString(message?.reference_id)}
                <SVGIcon
                  name='dot-icon'
                  width='4'
                  height='4'
                  fill='none'
                  viewBox='0 0 4 4'
                />
                <span>{moment(message?.created_at).fromNow()}</span>
              </Message>
            </ActivityDiv>
          );
        default:
          return <>{message.content}</>;
      }
    },
    [contact?.name, contact?.email],
  );

  return (
    <Main>
      <MainDiv>
        <TopDiv>
          <HeaderDiv>
            <LeftDiv>
              <Icon
                onClick={() => {
                  router.push('/');
                }}
                iconName='back-icon'
                iconSize='12'
                iconViewBox='0 0 16 16'
                size={true}
              />
              <Title>{ticketDetails?.title || ''}</Title>
            </LeftDiv>
            {/* Remove three dot icon from header */}
            {/* <Icon
              onClick={() => {}}
              iconName='three-dot-icon'
              iconSize='16'
              iconViewBox='0 0 16 16'
            /> */}
          </HeaderDiv>
          <StatusDiv>
            <ButtonDiv>
              <DropDownWithTag
                onClick={handleLabelTag}
                title={'Bug'}
                iconName={'bug-icon'}
                dropdownOpen={labelDropdown}
                onClose={() => setLabelDropdown(false)}
                items={labelItem}
                onChange={() => {}}
                isTag={true}
                isSearch={true}
                isCheckbox={true}
                isActive={true}
              />
              <DropDownWithTag
                onClick={handlePriorityTag}
                title={'Priority'}
                iconName={`priority-${priority || 'NONE'}`}
                dropdownOpen={priorityDropdown}
                onClose={() => setPriorityDropdown(false)}
                items={priorityItem}
                onChange={onChangePriority}
                selectedValue={{ name: priority || 'NONE' }}
                isTag={true}
                isActive={true}
              />
              <AssigneeDropdown
                onClick={handleAssignTag}
                selectedValue={assignedUser}
                dropdownOpen={assignDropdown}
                onClose={() => setAssignDropdown(false)}
                items={assignItem}
                onChange={onChangeAssign}
                isActive={true}
                iconSize='20'
              />
            </ButtonDiv>
            <ButtonDiv>
              {ticketDetails?.status !== TicketStatus.CLOSED ? (
                <Tag
                  title='Close'
                  iconName='close-icon'
                  isActive={false}
                  onClick={() => handleTicketStatus(TicketStatus.CLOSED)}
                  isName={false}
                />
              ) : (
                <Tag
                  title='Re-Open'
                  iconName='close-icon'
                  isActive={false}
                  onClick={() => handleTicketStatus(TicketStatus.OPEN)}
                  isName={false}
                />
              )}
              <SnoozeDropdown
                onClick={handleSnoozeTag}
                dropdownOpen={snoozeDropdown}
                onClose={() => setSnoozeDropdown(false)}
                items={snoozeItem}
                onChange={() => {}}
                isActive={snoozeDropdown ? true : false}
              />
            </ButtonDiv>
          </StatusDiv>
        </TopDiv>
        <div style={{ padding: '0 20px' }}>
          <BottomDiv>
            <CenterDiv ref={messagesEndRef}>
              {messages?.map((message, index) => (
                <div>
                  {renderActivityMessage(message)}
                  {index !== messages?.length - 1 && <LineDiv />}
                </div>
              ))}
            </CenterDiv>
          </BottomDiv>
          <InputDiv>
            <div className='input-main-div'>
              <div className='line' />
              <div className='avtar'>
                <Avatar
                  imgSrc={user?.profile_url || ''}
                  size={20}
                  name={user?.display_name || ''}
                />
              </div>
              <Input modeSelectedItem={modeSelectedItem}>
                <RichTextBox
                  isInternalDiscussion={modeSelectedItem.name !== 'Email'}
                  users={currentWorkspace?.users}
                  placeholder='Write a message'
                  valueContent={commentValue}
                  setValueContent={setCommentValue}
                />
                <InputIcon>
                  <DropDownWithTag
                    onClick={handleMessageModeTag}
                    selectedValue={modeSelectedItem}
                    dropdownOpen={messageModeDropdown}
                    title='Email'
                    onClose={() => {
                      setMessageModeDropdown(false);
                    }}
                    items={modeItem}
                    onChange={handleModeItemChange}
                    isTag={true}
                    iconName={modeSelectedItem?.icon}
                    iconSize='12'
                    iconViewBox='0 0 12 12'
                    isActive={messageModeDropdown ? true : false}
                    className={
                      submenuPosition === 'upwards'
                        ? 'submenu-upwards'
                        : 'submenu-downwards'
                    }
                    onMouseEnter={(e: any) =>
                      handleMouseEnter(e, setSubmenuPosition)
                    }
                    dropDownStyle={{ maxWidth: 142, width: '100%' }}
                    tagStyle={{
                      backgroundColor: (() => {
                        if (modeSelectedItem?.name === 'Email') {
                          return `${colors.bg_surface_secondary}`;
                        } else if (modeSelectedItem?.name === 'Internal') {
                          return `${colors.bg_surface_secondary_hover}`;
                        } else {
                          return undefined;
                        }
                      })(),
                    }}
                  />
                  <IconDiv modeSelectedItem={modeSelectedItem}>
                    <Icon
                      onClick={() => {}}
                      iconName='attach-icon'
                      iconSize='12'
                      iconViewBox='0 0 12 12'
                      size={true}
                    />
                    <Icon
                      onClick={() =>
                        handleCommentSend(commentValue, modeSelectedItem.name)
                      }
                      iconName='send-icon'
                      iconSize='12'
                      iconViewBox='0 0 12 12'
                      size={true}
                      isActive={true}
                      className='icon'
                    />
                  </IconDiv>
                </InputIcon>
              </Input>
            </div>
          </InputDiv>
        </div>
      </MainDiv>
      <ProfileSection />
    </Main>
  );
}

export default observer(TicketDetails);
