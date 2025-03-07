import { action, makeObservable, observable } from 'mobx';
import { User } from '@prisma/client';
import { TaskCreatePayload, TeamcampTask } from '@/utils/dataTypes';

const getInitialTaskCreateInput = (): TaskCreatePayload => ({
  taskName: '',
  description: '',
  priority: 0,
  taskUsers: [],
  files: [],
  ticketId: '',
});

class TeamcampStore {
  loading = false;
  projectUsers: User[] = [];
  taskCreateInput: TaskCreatePayload = getInitialTaskCreateInput();
  taskList: TeamcampTask[] = [];

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

      // task list
      taskList: observable,
      setTaskList: action,
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

  // set task list
  setTaskList(value: TeamcampTask[]) {
    this.taskList = value;
  }
}

export const teamcampStore = new TeamcampStore();
