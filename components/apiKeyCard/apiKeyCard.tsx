import React from 'react';
import Icon from '../icon/icon';
import DropDown from '../dropDown/dropDown';
import { CardMainDiv, LeftDiv, RightDiv, TitleDiv } from './style';

interface Props {
  keyName: string;
  keyNumber: string;
  currentOpenDropdown: string | null;
  // eslint-disable-next-line no-unused-vars
  setCurrentOpenDropdown: (dropdown: string | null) => void;
  dropdownIdentifier: string;
}

function ApiKeyCard({
  keyName,
  keyNumber,
  currentOpenDropdown,
  setCurrentOpenDropdown,
  dropdownIdentifier,
}: Props) {
  const dropDownItem = [
    { name: 'Delete', icon: 'delete-icon', isDelete: true },
  ];

  const handleDropdownClick = (dropdown: string) => {
    const identifier = `${dropdownIdentifier}-${dropdown}`;
    setCurrentOpenDropdown(
      currentOpenDropdown === identifier ? null : identifier,
    );
  };

  return (
    <CardMainDiv>
      <LeftDiv>
        <TitleDiv>
          <h6>{keyName}</h6>
          <p>{keyNumber}</p>
        </TitleDiv>
      </LeftDiv>
      <RightDiv>
        <Icon
          iconName='apikey-copy-icon'
          iconSize='12'
          iconViewBox='0 0 12 12'
          onClick={() => {}}
          size={true}
        />
        <div style={{ position: 'relative' }} className='tag-div'>
          <Icon
            onClick={() => handleDropdownClick('key')}
            iconName='three-dot-icon'
            iconSize='16'
            iconViewBox='0 0 16 16'
            size={true}
          />
          {currentOpenDropdown === `${dropdownIdentifier}-key` && (
            <DropDown
              items={dropDownItem}
              iconSize={'12'}
              iconViewBox={'0 0 12 12'}
              onClose={() => {
                setCurrentOpenDropdown(null);
              }}
              style={{ right: 0, minWidth: 116 }}
            />
          )}
        </div>
      </RightDiv>
    </CardMainDiv>
  );
}

export default ApiKeyCard;
