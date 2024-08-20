import React, { useCallback, useState } from 'react';
import Avatar from '../avtar/Avtar';
import Icon from '../icon/icon';
import DropDown from '../dropDown/dropDown';
import { CardDiv, LeftDiv, NameDiv, RightDiv } from './style';
import { capitalizeString, isEmpty } from '@/helpers/common';

interface Props {
  userId: string;
  // eslint-disable-next-line no-unused-vars
  handleClick?: (value: string | null, userId: string) => void;
  designation?: string;
  name: string;
  email: string;
  src: string;
}

function MemberCard({
  userId,
  handleClick,
  designation,
  name,
  email,
  src,
}: Props) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropDownItem = [
    {
      name: isEmpty(designation) ? 'Make Admin' : 'Remove Admin',
      icon: 'admin-icon',
    },
    { name: 'Delete', icon: 'delete-icon', isDelete: true },
  ];

  const handleClickIcon = useCallback(() => {
    setOpenDropdown(!openDropdown);
  }, [openDropdown]);

  return (
    <CardDiv>
      <LeftDiv>
        <Avatar imgSrc={src} name={name} size={28} isShowBorder={true} />
        <NameDiv>
          <h6>{name}</h6>
          <p>{email}</p>
        </NameDiv>
      </LeftDiv>
      <RightDiv>
        {designation && <h6>{capitalizeString(designation)}</h6>}
        <div style={{ position: 'relative' }} className='tag-div'>
          <Icon
            onClick={handleClickIcon}
            iconName='three-dot-icon'
            iconSize='16'
            iconViewBox='0 0 16 16'
            size={true}
          />
          {openDropdown && (
            <DropDown
              items={dropDownItem}
              iconSize={'12'}
              iconViewBox={'0 0 12 12'}
              userId={userId}
              handleClick={handleClick}
              onClose={() => {
                setOpenDropdown(false);
              }}
              style={{ right: 0 }}
            />
          )}
        </div>
      </RightDiv>
    </CardDiv>
  );
}

export default MemberCard;
