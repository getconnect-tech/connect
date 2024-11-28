import React, { SyntheticEvent, useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { createAPIKey } from '@/services/clientSide/settingServices';
import { getAPIErrorMessage } from '@/helpers/common';
import { messageStore } from '@/stores/messageStore';
import { useStores } from '@/stores';
import Icon from '../icon/icon';
import Input from '../input/input';
import Button from '../button/button';
import { BottomDiv, Header, Label, MainDiv, Title } from './style';

interface Props {
  onClose: () => void;
  loadData: () => void;
}

const CreateKeyModal = ({ onClose, loadData }: Props) => {
  const { settingStore } = useStores();
  const { loading } = settingStore || {};
  const [keyName, setKeyName] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyName(event.target.value);
  };

  const handleCreateKey = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      if (keyName.trim() === '') {
        messageStore.setErrorMessage('Please enter a valid key name.');
        return;
      }
      try {
        const ApiName = {
          name: keyName,
        };
        const response = await createAPIKey(ApiName);
        if (response) {
          messageStore.setSuccessMessage('API Key created successfully!');
          loadData();
          onClose();
        }
      } catch (err: any) {
        messageStore.setErrorMessage(
          getAPIErrorMessage(err) || 'Something went wrong!',
        );
      }
    },
    [keyName, loadData, onClose],
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
          <Button
            type='submit'
            title='Create'
            variant='medium'
            isLoading={loading}
          />
        </div>
      </BottomDiv>
    </MainDiv>
  );
};

export default observer(CreateKeyModal);
