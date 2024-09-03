import { action, makeObservable, observable } from 'mobx';
import { Label } from '@prisma/client';
import { ApiKey, Macros } from '@/utils/dataTypes';

class SettingStore {
  loading = false;
  apiKeys: ApiKey[] | null = null;
  labels: Label[] | null = null;
  macros: Macros[] = [];

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
      updateMacros: action,
      deleteMacros: action,
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
  setMacros(value: Macros[]) {
    this.macros = value;
  }

  //add Macros
  addMacros(value: Macros) {
    this.macros = [...(this.macros || []), value];
  }

  //update macro
  updateMacros(index: number, updatedMacro: Macros) {
    this.macros[index] = updatedMacro;
  }

  // Delete Macro
  deleteMacros(macroId: string) {
    const index = this.macros.findIndex((macro) => macro.id === macroId);
    if (index !== -1) this.macros.splice(index, 1);
  }
}

export const settingStore = new SettingStore();
