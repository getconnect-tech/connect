import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import Icon from '../icon/icon';
import Input from '../input/input';
import Button from '../button/button';
import { BottomDiv, Header, Label, MainDiv, Title } from './style';
import { inviteUsersToWorkspace } from '@/services/clientSide/workspaceServices';
import { useStores } from '@/stores';

interface Props {
  onClose: () => void;
}

const InviteMemberModal = ({ onClose }: Props) => {
  const { workspaceStore } = useStores();
  const { inviteModalInput, loading } = workspaceStore;

  const handleInvite = async () => {
    workspaceStore.setLoading(true);
    try {
      await inviteUsersToWorkspace([
        { displayName: inviteModalInput.name, email: inviteModalInput.email },
      ]);
    } catch (error) {
      console.log('error', error);
    } finally {
      onClose();
      workspaceStore.setLoading(false);
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
      <BottomDiv>
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
          <Button onClick={handleInvite} title='Invite' isLoading={loading} />
        </div>
      </BottomDiv>
    </MainDiv>
  );
};

export default observer(InviteMemberModal);
