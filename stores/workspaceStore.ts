import { Workspace } from "@prisma/client";
import { action, makeObservable, observable } from "mobx";

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
    this.currentWorkspace = value;
  }
}

export const workspaceStore = new WorkspaceStore();
