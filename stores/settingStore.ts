import { action, makeObservable, observable } from 'mobx';
import { GetAllApi } from '@/utils/dataTypes';

class SettingStore {
  loading = false;
  apiKeys: GetAllApi[] | null = null;

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
  setAPIKeys(value: GetAllApi[]) {
    this.apiKeys = value;
  }
}

export const settingStore = new SettingStore();
