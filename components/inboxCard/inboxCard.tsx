/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Ticket } from '@prisma/client';
import moment from 'moment';
import Avatar from '../avtar/Avtar';
import DropDownWithTag from '../dropDownWithTag/dropDownWithTag';
import {
  CardDiv,
  DesTitle,
  DotIcon,
  LeftDiv,
  NameText,
  RightDiv,
  StatusMainDiv,
} from './style';
import { lableItem, priorityItem } from '@/helpers/raw';
import { capitalizeString } from '@/helpers/common';

interface Props {
  ticketDetail: Ticket;
  description: string;
  showDotIcon?: boolean;
  src: string;
}

export default function InboxCard({
  ticketDetail,
  description,
  showDotIcon = false,
  src,
}: Props) {
  const { title, created_at, sender_name, source } = ticketDetail;
  const router = useRouter();
  const [labelDropdown, setLabelDropdown] = useState(false);
  const [priorityDropdown, setPriorityDropdown] = useState(false);
  const [assignDropdown, setAssignDropdown] = useState(false);

  const handlePriorityTag = () => {
    setPriorityDropdown((prev) => !prev);
    setAssignDropdown(false);
    setLabelDropdown(false);
  };

  const handleLableTag = () => {
    setLabelDropdown((prev) => !prev);
    setAssignDropdown(false);
    setPriorityDropdown(false);
  };

  const handleAssignTag = () => {
    setAssignDropdown((prev) => !prev);
    setPriorityDropdown(false);
    setLabelDropdown(false);
  };

  const [submenuPosition, setSubmenuPosition] = useState<
    'upwards' | 'downwards'
  >('upwards');

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLElement>,
    setPosition: (position: 'upwards' | 'downwards') => void,
  ) => {
    const triggerElement = e.currentTarget;
    const rect = triggerElement.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < 200 && spaceAbove > 200) {
      setPosition('upwards');
    } else {
      setPosition('downwards');
    }
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

  return (
    <CardDiv
      onClick={() => {
        router.push('/details');
      }}
    >
      {showDotIcon && <DotIcon />}
      <LeftDiv>
        <Avatar size={28} imgSrc={src} name={sender_name} isShowBorder={true} />
        <RightDiv>
          <NameText>
            {sender_name} from {capitalizeString(source)}
          </NameText>
          <DesTitle>{title}</DesTitle>
          <NameText className='description'>{description}</NameText>
          <StatusMainDiv>
            <DropDownWithTag
              onClick={handleLableTag}
              title={'Bug'}
              iconName={'bug-icon'}
              dropdownOpen={labelDropdown}
              onClose={() => setLabelDropdown(false)}
              items={lableItem}
              onChange={() => {}}
              isTag={true}
              isSearch={true}
              isCheckbox={true}
              isActive={true}
              className={
                submenuPosition === 'upwards'
                  ? 'submenu-upwards'
                  : 'submenu-downwards'
              }
              onMouseEnter={(e: any) => handleMouseEnter(e, setSubmenuPosition)}
            />
            <DropDownWithTag
              onClick={handlePriorityTag}
              title={'Priority'}
              iconName={'priority-no-icon'}
              dropdownOpen={priorityDropdown}
              onClose={() => setPriorityDropdown(false)}
              items={priorityItem}
              onChange={() => {}}
              isTag={true}
              isActive={true}
              className={
                submenuPosition === 'upwards'
                  ? 'submenu-upwards'
                  : 'submenu-downwards'
              }
              onMouseEnter={(e: any) => handleMouseEnter(e, setSubmenuPosition)}
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
              className={
                submenuPosition === 'upwards'
                  ? 'submenu-upwards'
                  : 'submenu-downwards'
              }
              onMouseEnter={(e: any) => handleMouseEnter(e, setSubmenuPosition)}
              src='https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4'
            />
          </StatusMainDiv>
        </RightDiv>
      </LeftDiv>
      <NameText>{moment(created_at).fromNow()}</NameText>
    </CardDiv>
  );
}
