import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';
import { CurrentWorkspace, InviteModal, Workspace } from '@/utils/dataTypes';

class WorkspaceStore {
  loading = false;
  currentWorkspace: CurrentWorkspace | null = null;
  inviteModalInput: InviteModal = { name: '', email: '' };
  workspaceList: Workspace[] | null = null;

  constructor() {
    makeObservable(this, {
      //Loading
      loading: observable,
      setLoading: action,

      // Current Workspace
      currentWorkspace: observable,
      setCurrentWorkspace: action,
      removeUserFromWorkspace: action,
      removeInvitedUserFromWorkspace: action,

      // Invite Mopdal Input
      inviteModalInput: observable,
      updateInviteModalInput: action,
      resetInviteModalInput: action,

      // Workspace List
      workspaceList: observable,
      setWorkspaceList: action,
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
    if (userIndex !== undefined && userIndex !== -1) {
      this.currentWorkspace?.users?.splice(userIndex, 1);
    }
  }

  // Remove invited user from workspace
  removeInvitedUserFromWorkspace(userId: string) {
    const userIndex = this.currentWorkspace?.invited_users?.findIndex(
      (user) => user?.id === userId,
    );
    if (userIndex !== undefined && userIndex !== -1) {
      this.currentWorkspace?.invited_users?.splice(userIndex, 1);
    }
  }

  updateInviteModalInput(propsName: 'name' | 'email', value: string) {
    this.inviteModalInput[propsName] = value;
  }

  resetInviteModalInput() {
    this.inviteModalInput = { name: '', email: '' };
  }

  // New action to set workspace list
  setWorkspaceList(value: Workspace[]) {
    this.workspaceList = value;
  }
}

export const workspaceStore = new WorkspaceStore();
