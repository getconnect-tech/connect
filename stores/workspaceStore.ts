import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';
import { CurrentWorkspace, InviteModal } from '@/utils/dataTypes';

class WorkspaceStore {
  loading = false;
  currentWorkspace: CurrentWorkspace | null = null;
  inviteModalInput: InviteModal = { name: '', email: '' };

  constructor() {
    makeObservable(this, {
      //Loading
      loading: observable,
      setLoading: action,

      // Current Workspace
      currentWorkspace: observable,
      setCurrentWorkspace: action,
      removeUserFromWorkspace: action,

      // Invite Mopdal Input
      inviteModalInput: observable,
      updateInviteModalInput: action,
      resetInviteModalInput: action,
    });
  }

  // Loading actions
  setLoading(value: boolean) {
    this.loading = value;
  }

  setCurrentWorkspace(value: CurrentWorkspace) {
    axios.defaults.headers.common['workspace_id'] = value?.id;
    this.currentWorkspace = value;
  }

  // Remove user from workspace
  removeUserFromWorkspace(userId: string) {
    const userIndex = this.currentWorkspace?.users?.findIndex(
      (user) => user?.id === userId,
    );
    if (userIndex && userIndex !== -1) {
      this.currentWorkspace?.users?.splice(userIndex, 1);
    }
  }

  updateInviteModalInput(propsName: 'name' | 'email', value: string) {
    this.inviteModalInput[propsName] = value;
  }

  resetInviteModalInput() {
    this.inviteModalInput = { name: '', email: '' };
  }
}

export const workspaceStore = new WorkspaceStore();
