import React, { useCallback } from 'react';
import Avatar from '../avtar/Avtar';
import Icon from '../icon/icon';
import DropDown from '../dropDown/dropDown';
import { CardDiv, LeftDiv, NameDiv, RightDiv } from './style';

interface Props {
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
  designation,
  name,
  email,
  src,
  dropdownIdentifier,
  currentOpenDropdown,
  setOpenDropdown,
}: Props) {
  const dropDownItem = [
    { name: 'Make Admin', icon: 'admin-icon' },
    { name: 'Delete', icon: 'delete-icon', isDelete: true },
  ];

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
        {designation && <h6>{designation}</h6>}
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
              items={dropDownItem}
              iconSize={'12'}
              iconViewBox={'0 0 12 12'}
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
