/* eslint-disable no-undef */
import React, { SyntheticEvent, useCallback, useState } from 'react';
import Icon from '../icon/icon';
import Input from '../input/input';
import Button from '../button/button';
import { BottomDiv, Header, Label, MainDiv, Title } from './style';
import { createAPIKey } from '@/services/clientSide/settingServices';
import { getAPIErrorMessage } from '@/helpers/common';

interface Props {
  onClose: () => void;
  loadData: () => void;
}

function CreateKeyModal({ onClose, loadData }: Props) {
  const [keyName, setKeyName] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyName(event.target.value);
  };

  const handleCreateKey = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      if (keyName.trim() === '') {
        alert('Please enter a valid key name.');
        return;
      }
      try {
        const ApiName = {
          name: keyName,
        };
        const response = await createAPIKey(ApiName);
        if (response) {
          alert('API Key created successfully!');
          loadData();
          onClose();
        }
      } catch (err: any) {
        alert(getAPIErrorMessage(err) || 'Something went wrong!');
      }
    },
    [keyName],
  );

  return (
    <MainDiv>
      <Header>
        <Title>Create API key</Title>
        <Icon
          iconName='cross-icon'
          iconSize='12'
          iconViewBox='0 0 16 16'
          onClick={onClose}
        />
      </Header>
      <BottomDiv onSubmit={handleCreateKey}>
        <Label>
          Name <span>(This is just for your reference)</span>
        </Label>
        <Input
          placeholder={'Enter your key name'}
          className='input'
          value={keyName}
          onChange={handleInputChange}
        />
        <div className='button'>
          <Button
            type='submit'
            title='Cancel'
            secondary={true}
            variant='medium'
            onClick={onClose}
          />
          <Button type='submit' title='Create' variant='medium' />
        </div>
      </BottomDiv>
    </MainDiv>
  );
}

export default CreateKeyModal;
