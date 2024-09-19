import { action, makeObservable, observable } from 'mobx';

class AppStore {
  uploadLoading: number | null = null;

  constructor() {
    makeObservable(this, {
      // Upload file percentage
      uploadLoading: observable,
      setUploadLoading: action,
    });
  }

  // Update loding percentage
  setUploadLoading(percentage: number) {
    this.uploadLoading = percentage;
    if (this.uploadLoading === 100) this.uploadLoading = null;
  }
}

export const appStore = new AppStore();
