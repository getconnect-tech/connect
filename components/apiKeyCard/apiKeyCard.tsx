import React, { useCallback } from 'react';
import copy from 'clipboard-copy';
import Icon from '../icon/icon';
import DropDown from '../dropDown/dropDown';
import { CardMainDiv, LeftDiv, RightDiv, TitleDiv } from './style';
import { getAPIErrorMessage } from '@/helpers/common';
import { messageStore } from '@/stores/messageStore';

interface Props {
  keyName: string;
  keyNumber: string;
  currentOpenDropdown: string | null;
  // eslint-disable-next-line no-unused-vars
  setCurrentOpenDropdown: (dropdown: string | null) => void;
  dropdownIdentifier: string;
  apiKey: string;
}

function ApiKeyCard({
  keyName,
  keyNumber,
  currentOpenDropdown,
  setCurrentOpenDropdown,
  dropdownIdentifier,
  apiKey,
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

  const handleCopyClick = useCallback(async () => {
    try {
      await copy(apiKey);
      messageStore.setSuccessMessage('Copied successfully');
    } catch (err: any) {
      messageStore.setErrorMessage(
        getAPIErrorMessage(err) || 'Something went wrong!',
      );
      return false;
    }
  }, []);

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
          onClick={handleCopyClick}
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
