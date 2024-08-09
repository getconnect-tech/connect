import { User } from '@prisma/client';
import { action, makeObservable, observable } from 'mobx';

class UserStore {
  loading = false;
  user: User | null = null;

  constructor() {
    makeObservable(this, {
      //Loading variable
      loading: observable,
      setLoading: action,

      //User Details
      user: observable,
      setUserDetails: action,
    });
  }

  // Loading actions
  setLoading(value: boolean) {
    this.loading = value;
  }

  // User actions
  setUserDetails(value: User) {
    this.user = value;
  }

  clearUserDetails() {
    this.user = null;
  }
}

export const userStore = new UserStore();
