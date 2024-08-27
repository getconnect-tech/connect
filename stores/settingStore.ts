import { action, makeObservable, observable } from 'mobx';
import { ApiKey } from '@/utils/dataTypes';

class SettingStore {
  loading = false;
  apiKeys: ApiKey[] | null = null;

  constructor() {
    makeObservable(this, {
      //Loading
      loading: observable,
      setLoading: action,

      // API Keys
      apiKeys: observable,
      setAPIKeys: action,
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
}

export const settingStore = new SettingStore();
