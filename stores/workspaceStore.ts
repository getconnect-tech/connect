import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';
import { InviteModal, Workspace } from '@/utils/dataTypes';

class WorkspaceStore {
  loading = false;
  currentWorkspace: Workspace | null = null;
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

  setCurrentWorkspace(value: Workspace) {
    axios.defaults.headers.common['workspace_id'] = value?.id;
    this.currentWorkspace = value;
  }

  // Remove user from workspace
  removeUserFromWorkspace(userId: string) {
    const userData = this.currentWorkspace;

    if (!userData || !userData.users) {
      return;
    }

    // Loop through the users array
    for (let i = 0; i < userData.users.length; i++) {
      if (userData.users[i].id === userId) {
        userData.users.splice(i, 1);
        break;
      }
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
