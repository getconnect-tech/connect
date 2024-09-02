import { action, makeObservable, observable } from 'mobx';
import { Label } from '@prisma/client';
import { ApiKey } from '@/utils/dataTypes';

class SettingStore {
  loading = false;
  apiKeys: ApiKey[] | null = null;
  labels: Label[] | null = null;
  macros: any[] = [];

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
      setLabels: action,
      addLabel: action,
      updateLabel: action,
      removeLabel: action,

      //macros
      macros: observable,
      setMacros: action,
      addMacros: action,
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

  // set labels
  setLabels(value: Label[]) {
    this.labels = value;
  }
  // add label
  addLabel(value: Label) {
    this.labels = [...(this.labels || []), value];
  }

  // Update Label
  updateLabel(labelId: string, value: Label) {
    if (!this.labels) return;

    this.labels = this.labels.map((label) =>
      label.id === labelId ? { ...label, ...value } : label,
    );
  }

  // Remove Label
  removeLabel(labelId: string) {
    if (!this.labels) return;

    this.labels = this.labels.filter((label) => label.id !== labelId);
  }
  // set macros
  setMacros(value: any[]) {
    this.macros = value;
  }

  //add Macros
  addMacros(value: any) {
    this.macros = [...(this.macros || []), value];
  }
}

export const settingStore = new SettingStore();
