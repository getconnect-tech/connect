import { action, makeObservable, observable } from 'mobx';
import { Label } from '@prisma/client';
import { ApiKey } from '@/utils/dataTypes';

class SettingStore {
  loading = false;
  apiKeys: ApiKey[] | null = null;
  labels: Label[] | null = null;

  constructor() {
    makeObservable(this, {
      //Loading
      loading: observable,
      setLoading: action,

      // API Keys
      apiKeys: observable,
      setAPIKeys: action,

      // Labels
      labels: observable,
      addLabel: action,
    });
  }

  // Loading actions
  setLoading(value: boolean) {
    this.loading = value;
  }

  // set API keys
  setAPIKeys(value: ApiKey[]) {
    this.apiKeys = value;
  }

  // add label
  addLabel(value: Label) {
    this.labels = [...(this.labels || []), value];
  }
}

export const settingStore = new SettingStore();
