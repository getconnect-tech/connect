import axios from 'axios';
import { TaskCreatePayload, TeamcampUser } from '@/utils/dataTypes';

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

  return tasks;
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

  const projectUsers: TeamcampUser[] = (workspaceUsers || []).filter(
    (user: TeamcampUser) => project.projectUsers.includes(user.id),
  );

  return projectUsers;
};
