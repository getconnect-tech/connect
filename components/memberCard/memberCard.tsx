import React, { useCallback } from 'react';
import { UserRole } from '@prisma/client';
import Avatar from '../avtar/Avtar';
import Icon from '../icon/icon';
import DropDown, { DropDownItem, HandleClickProps } from '../dropDown/dropDown';
import { CardDiv, LeftDiv, NameDiv, RightDiv } from './style';
import { capitalizeString } from '@/helpers/common';

interface Props {
  userId: string;
  // eslint-disable-next-line no-unused-vars
  handleClick?: (props: HandleClickProps) => void;
  designation?: string;
  name: string;
  email: string;
  src: string;
  currentOpenDropdown?: string | null;
  dropdownIdentifier?: string;
  // eslint-disable-next-line no-unused-vars
  setOpenDropdown: (dropdown: string | null) => void;
}

function MemberCard({
  userId,
  handleClick,
  designation,
  name,
  email,
  src,
  dropdownIdentifier,
  currentOpenDropdown,
  setOpenDropdown,
}: Props) {
  let dropDownItem: DropDownItem[];
  if (designation === UserRole.OWNER) {
    dropDownItem = [];
  } else if (designation === UserRole.MEMBER) {
    dropDownItem = [
      {
        name: 'Make Admin',
        icon: 'admin-icon',
      },
      { name: 'Delete', icon: 'delete-icon', isDelete: true },
    ];
  } else if (designation === UserRole.ADMIN) {
    dropDownItem = [
      {
        name: 'Remove Admin',
        icon: 'admin-icon',
      },
      { name: 'Delete', icon: 'delete-icon', isDelete: true },
    ];
  } else {
    dropDownItem = [
      {
        name: 'Delete',
        icon: 'delete-icon',
        isDelete: true,
        status: 'Pending',
      },
    ];
  }

  const handleClickIcon = useCallback(() => {
    const identifier = `${dropdownIdentifier}-member`;
    setOpenDropdown(currentOpenDropdown === identifier ? null : identifier);
  }, [dropdownIdentifier, currentOpenDropdown, setOpenDropdown]);

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
        {designation && designation !== UserRole.MEMBER && (
          <h6>{capitalizeString(designation)}</h6>
        )}
        <div style={{ position: 'relative' }} className='tag-div'>
          <Icon
            onClick={handleClickIcon}
            iconName='three-dot-icon'
            iconSize='16'
            iconViewBox='0 0 16 16'
            size={true}
          />
          {currentOpenDropdown === `${dropdownIdentifier}-member` && (
            <DropDown
              items={dropDownItem || []}
              iconSize={'12'}
              iconViewBox={'0 0 12 12'}
              userId={userId}
              handleClick={handleClick}
              onClose={() => {
                setOpenDropdown(null);
              }}
              style={{ right: 0, zIndex: 1 }}
            />
          )}
        </div>
      </RightDiv>
    </CardDiv>
  );
}

export default MemberCard;
