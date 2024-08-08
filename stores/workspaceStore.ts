import { Workspace } from '@prisma/client';
import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';

class WorkspaceStore {
  loading = false;
  currentWorkspace: Workspace | null = null;

  constructor() {
    makeObservable(this, {
      //Loading
      loading: observable,
      setLoading: action,

      // Current Workspace
      currentWorkspace: observable,
      setCurrentWorkspace: action,
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
}

export const workspaceStore = new WorkspaceStore();
