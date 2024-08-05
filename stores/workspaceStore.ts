import { action, makeObservable, observable } from 'mobx';

class WorkspaceStore {
  loading = false;
  currentWorkspace = null;

  constructor() {
    makeObservable(this, {
      //Loading
      setLoading: action,
      loading: observable,

      //User Details
      currentWorkspace: observable,
    });
  }

  // Loading actions
  setLoading(value: boolean) {
    this.loading = value;
  }
}

export const workspaceStore = new WorkspaceStore();
