import { action, makeObservable, observable } from 'mobx';
import { TeamcampUser } from '@/utils/dataTypes';

class TeamcampStore {
  loading = false;
  projectUsers: TeamcampUser[] = [];

  constructor() {
    makeObservable(this, {
      //Loading
      loading: observable,
      setLoading: action,

      // projectUser
      projectUsers: observable,
      setProjectUsers: action,
    });
  }

  // Loading actions
  setLoading(value: boolean) {
    this.loading = value;
  }

  //   set project users
  setProjectUsers(value: TeamcampUser[]) {
    this.projectUsers = value;
  }
}

export const teamcampStore = new TeamcampStore();
