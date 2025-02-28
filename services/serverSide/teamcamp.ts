import axios from 'axios';
import { User } from '@prisma/client';
import {
  TaskCreatePayload,
  TeamcampTask,
  TeamcampUser,
} from '@/utils/dataTypes';
import { STATUS_ICON_NAMES } from '@/global/constants';

const apiKey = process.env.TEAMCAMP_API_KEY;
const projectId = process.env.TEAMCAMP_PROJECT_ID;

const teamcampApiClient = axios.create({
  baseURL: process.env.TEAMCAMP_API_URL,
  headers: { apiKey },
  params: { projectId },
});

export const getTasks = async () => {
  const { data: project } = await teamcampApiClient.get(
    `/project/${projectId}`,
  );

  const { data: tasks } = await teamcampApiClient.get(`/task/taskHandler`);

  if (project.statusEnable) {
    for (const task of tasks) {
      const taskStatus = project.status?.find(
        (status: any) => status._id === task.statusId,
      );

      task.taskStatus = taskStatus;
    }
  }

  const formattedTasks: TeamcampTask[] = tasks.map(formatTeamcampTask);
  return formattedTasks;
};

export const createTask = async (payload: TaskCreatePayload) => {
  const newTaskPayload = { ...payload, projectId };

  const { data } = await teamcampApiClient.post(
    '/task/taskHandler',
    newTaskPayload,
  );

  return data;
};

export const getProjectUsers = async () => {
  const { data: workspaceUsers } =
    await teamcampApiClient.get('/company/users');

  const { data: project } = await teamcampApiClient.get(
    `/project/${projectId}`,
  );

  const projectUsers: User[] = (workspaceUsers || [])
    .filter((user: TeamcampUser) => project.projectUsers.includes(user.id))
    .map(formatTeamcampUserToUser);

  return projectUsers;
};

export const formatTeamcampUserToUser = (teamcampUser: TeamcampUser) => {
  const user: User = {
    id: teamcampUser.id,
    email: teamcampUser.email,
    display_name: teamcampUser.name,
    profile_url: teamcampUser.profile_photo || null,
    created_at: new Date(),
    is_verified: false,
    updated_at: new Date(),
  };

  return user;
};

export const formatTeamcampTask = (teamcampTask: any) => {
  const status = teamcampTask.taskStatus
    ? STATUS_ICON_NAMES[
        teamcampTask.taskStatus.Type as keyof typeof STATUS_ICON_NAMES
      ]
    : teamcampTask.status
      ? 'complete-icon'
      : 'default-icon';

  const task: TeamcampTask = {
    id: teamcampTask.id,
    name: teamcampTask.taskName,
    status,
  };

  return task;
};
