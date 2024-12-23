import React, { ChangeEvent, SyntheticEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { inviteUsersToWorkspace } from '@/services/clientSide/workspaceServices';
import { useStores } from '@/stores';
import Icon from '../icon/icon';
import Input from '../input/input';
import Button from '../button/button';
import { BottomDiv, Header, Label, MainDiv, Title } from './style';

interface Props {
  onClose: () => void;
  loadData: () => void;
}

const InviteMemberModal = ({ onClose, loadData }: Props) => {
  const { workspaceStore } = useStores();
  const { inviteModalInput, loading } = workspaceStore;

  const handleInvite = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const result = await inviteUsersToWorkspace([
        { displayName: inviteModalInput.name, email: inviteModalInput.email },
      ]);
      if (result) {
        // reset modal input
        workspaceStore.resetInviteModalInput();
        loadData();
        onClose();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleOnChange = (propsName: 'name' | 'email', value: string) => {
    workspaceStore.updateInviteModalInput(propsName, value);
  };

  return (
    <MainDiv>
      <Header>
        <Title>Invite Member</Title>
        <Icon
          iconName='cross-icon'
          iconSize='12'
          iconViewBox='0 0 16 16'
          onClick={onClose}
        />
      </Header>
      <BottomDiv onSubmit={(e) => handleInvite(e)}>
        <Label>Name</Label>
        <Input
          value={inviteModalInput.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleOnChange('name', e.target.value)
          }
          placeholder={'Enter name'}
        />
        <Label className='email-label'>Email</Label>
        <Input
          value={inviteModalInput.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleOnChange('email', e.target.value)
          }
          placeholder={'Enter email address'}
        />
        <div className='button'>
          <Button
            type='submit'
            title='Invite'
            isLoading={loading}
            variant='medium'
          />
        </div>
      </BottomDiv>
    </MainDiv>
  );
};

export default observer(InviteMemberModal);
