import { action, makeObservable, observable } from "mobx";

class UserStore {
  loading = false;
  user = null;

  constructor() {
    makeObservable(this, {
      //Loading variable
      setLoading: action,
      loading: observable,

      //User Details
      user: observable,
    });
  }

  // Loading actions
  setLoading(value: boolean) {
    this.loading = value;
  }
}

export const userStore = new UserStore();
