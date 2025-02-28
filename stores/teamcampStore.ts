import { action, makeObservable, observable } from 'mobx';
import { User } from '@prisma/client';
import { TaskCreatePayload } from '@/utils/dataTypes';

const getInitialTaskCreateInput = (): TaskCreatePayload => ({
  taskName: '',
  description: '',
  priority: 0,
  taskUsers: [],
  files: [],
});

class TeamcampStore {
  loading = false;
  projectUsers: User[] = [];
  taskCreateInput: TaskCreatePayload = getInitialTaskCreateInput();

  constructor() {
    makeObservable(this, {
      //Loading
      loading: observable,
      setLoading: action,

      // projectUser
      projectUsers: observable,
      setProjectUsers: action,

      // create task input fields
      taskCreateInput: observable,
      updateTaskCreateInput: action,
    });
  }

  // Loading actions
  setLoading(value: boolean) {
    this.loading = value;
  }

  // set project users
  setProjectUsers(value: User[]) {
    this.projectUsers = value;
  }

  // set task create input
  updateTaskCreateInput<K extends keyof TaskCreatePayload>(
    key: K,
    value: TaskCreatePayload[K],
  ) {
    this.taskCreateInput[key] = value;
  }

  // set task create input
  clearTaskCreateInput() {
    this.taskCreateInput = getInitialTaskCreateInput();
  }
}

export const teamcampStore = new TeamcampStore();
