import React, { ChangeEvent, SyntheticEvent } from 'react';
import { observer } from 'mobx-react-lite';
import ModalComponent from '../modalComponent/modalComponent';
import { inviteUsersToWorkspace } from '@/services/clientSide/workspaceServices';
import { useStores } from '@/stores';

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
    <ModalComponent
      onClose={onClose}
      onSubmit={(e) => handleInvite(e)}
      loading={loading}
      value={inviteModalInput.name}
      value2={inviteModalInput.email}
      onChange2={(e: ChangeEvent<HTMLInputElement>) =>
        handleOnChange('email', e.target.value)
      }
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        handleOnChange('name', e.target.value)
      }
      buttonTitle='Invite'
      title={'Invite Member'}
      inputFirstLabel={'Name'}
      inputSecondLabel='Email'
      firstPlaceholder='Enter name'
      secondPlaceholder='Enter email address'
    />
  );
};

export default observer(InviteMemberModal);
