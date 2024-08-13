/* eslint-disable max-len */
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { PriorityLevels } from '@prisma/client';
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
import QuestionCard from '@/components/questionCard/questionCard';
import { labelItem, modeItem, priorityItem } from '@/helpers/raw';
import DropDownWithTag from '@/components/dropDownWithTag/dropDownWithTag';
import { useStores } from '@/stores';
import {
  getTicketDetails,
  updateTicketDetails,
} from '@/services/clientSide/ticketServices';
import { isEmpty } from '@/helpers/common';
import Icon from '@/components/icon/icon';
import { DropDownItem } from '@/components/dropDown/dropDown';
import Tag from '@/components/tag/tag';

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
  const { ticketStore, workspaceStore } = useStores();
  const { currentWorkspace } = workspaceStore;
  const { ticketDetails } = ticketStore;
  const { priority } = ticketDetails || {};
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
      await getTicketDetails(ticket_id);
    }
  }, [ticket_id, currentWorkspace?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handlePriorityTag = () => {
    setPriorityDropdown((prev) => !prev);
    setAssignDropdown(false);
    setLabelDropdown(false);
    setMessageModeDropdown(false);
  };

  const handleMessageModeTag = () => {
    setMessageModeDropdown((prev) => !prev);
    setAssignDropdown(false);
    setLabelDropdown(false);
    setPriorityDropdown(false);
  };

  const handleLabelTag = () => {
    setLabelDropdown((prev) => !prev);
    setAssignDropdown(false);
    setPriorityDropdown(false);
    setMessageModeDropdown(false);
  };

  const handleAssignTag = () => {
    setAssignDropdown((prev) => !prev);
    setPriorityDropdown(false);
    setLabelDropdown(false);
    setMessageModeDropdown(false);
  };

  const assignItem = [
    { name: 'Unassigned', icon: 'dropdown-unassign-icon' },
    {
      name: 'Sanjay M.',
      src: 'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4',
      isName: true,
    },
    {
      name: 'Aniket',
      src: 'https://bearbuk.blob.core.windows.net/project/Profile_63c0ec5555376218700f12d5_2023041410225842.png',
      isName: true,
    },
    {
      name: 'Jemish',
      src: 'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4',
      isName: true,
    },
    {
      name: 'Vatsal',
      src: 'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2F1708409574833_1712819712813.jpg?alt=media&token=42df7e19-9083-4c61-8b51-b43d5c3f4183',
      isName: true,
    },
  ];

  const onChangePriority = useCallback(
    async (item: { name: string; icon: string; value: PriorityLevels }) => {
      const payload = { priority: item?.value };
      try {
        if (ticketDetails?.id) {
          const updatedTicketDetails = {
            ...ticketDetails,
            priority: item?.value,
          };
          ticketStore.setTicketDetails(updatedTicketDetails);
          await updateTicketDetails(ticketDetails?.id, payload);
        }
      } catch (e) {
        console.log('Error : ', e);
      }
    },
    [ticketDetails],
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
                iconSize='16'
                iconViewBox='0 0 16 16'
                size={true}
              />
              <Title>{ticketDetails?.title || ''}</Title>
            </LeftDiv>
            <Icon
              onClick={() => {}}
              iconName='three-dot-icon'
              iconSize='16'
              iconViewBox='0 0 16 16'
            />
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
              <DropDownWithTag
                onClick={handleAssignTag}
                title={'Sanjay M.'}
                dropdownOpen={assignDropdown}
                onClose={() => setAssignDropdown(false)}
                items={assignItem}
                onChange={() => {}}
                isTag={true}
                isSearch={true}
                isActive={true}
                isName={true}
                iconSize='20'
                iconViewBox='0 0 20 20'
                src='https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4'
              />
            </ButtonDiv>
            <ButtonDiv>
              <Tag
                title='Close'
                iconName='close-icon'
                isActive={false}
                onClick={() => {}}
                isName={false}
              />
              <Tag
                title='Snooze'
                iconName='context-snooze-icon'
                isActive={false}
                onClick={() => {}}
                isName={false}
              />
            </ButtonDiv>
          </StatusDiv>
        </TopDiv>
        <BottomDiv>
          <CenterDiv>
            <ActivityDiv>
              <Avatar
                imgSrc={
                  'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4'
                }
                name={''}
                size={20}
              />
              <QuestionCard
                title={'@Aniket can you please look into this?'}
                time={'3 day ago'}
              />
            </ActivityDiv>
            <LineDiv />
            <ActivityDiv>
              <Avatar
                imgSrc={
                  'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4'
                }
                name={''}
                size={20}
              />
              <MessageCard
                title={'Sanjay send email'}
                time={'2 days ago'}
                subTitle={'To Teamcamp Support '}
                message={
                  "Hey,Thank you for choosing our services through our partner, Parthern. To ensure you receive the full benefits of your purchase, we invite you to create an account with us at Teamcamp.Create Your Account Today!Setting up your Teamcamp account is quick and easy. Follow this link to get started: www.teamcamp.app Need Help?If you have any questions or need assistance during the registration process, please do not hesitate to reply to this emailWe're excited to have you on board and look forward to supporting your project management needs!Warm regards,Sanjay M."
                }
              />
            </ActivityDiv>
            <LineDiv />
            <ActivityDiv>
              <Avatar
                imgSrc={
                  'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4'
                }
                name={''}
                size={20}
              />
              <Message>
                Connect AI <span>set priority to</span> Low
                <SVGIcon
                  name='dot-icon'
                  width='4'
                  height='4'
                  fill='none'
                  viewBox='0 0 4 4'
                />
                <span>2 min ago</span>
              </Message>
            </ActivityDiv>
            <LineDiv />
            <ActivityDiv>
              <Avatar
                imgSrc={
                  'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4'
                }
                name={''}
                size={20}
              />
              <Message>
                Connect AI <span>assigned this ticket to</span> Sanjay M.
                <SVGIcon
                  name='dot-icon'
                  width='4'
                  height='4'
                  fill='none'
                  viewBox='0 0 4 4'
                />
                <span>2 min ago</span>
              </Message>
            </ActivityDiv>
          </CenterDiv>
          <InputDiv>
            <Avatar
              imgSrc={
                'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4'
              }
              size={20}
              name={''}
            />
            <Input modeSelectedItem={modeSelectedItem}>
              <textarea placeholder='Write a message' />
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
                  isActive={true}
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
                    backgroundColor: 'unset',
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
                    onClick={() => {}}
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
          </InputDiv>
        </BottomDiv>
      </MainDiv>
      <ProfileSection />
    </Main>
  );
}

export default observer(TicketDetails);
