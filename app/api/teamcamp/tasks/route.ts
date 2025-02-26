import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import withAuth from '@/middlewares/withAuth';
import { createTask, getTasks } from '@/services/serverSide/teamcamp';
import {
  taskDescriptionSchema,
  taskFilesSchema,
  taskNameSchema,
  taskPrioritySchema,
  taskUsersSchema,
} from '@/lib/zod/teamcamp';

export const GET = withAuth(async () => {
  try {
    const tasks = await getTasks();

    return Response.json(tasks, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});

const RequestBody = z.object({
  taskName: taskNameSchema,
  description: taskDescriptionSchema,
  priority: taskPrioritySchema,
  taskUsers: taskUsersSchema,
  files: taskFilesSchema,
});
export const POST = withAuth(async (req) => {
  try {
    const requestBody = await req.json();
    RequestBody.parse(requestBody);

    const newTask = await createTask(requestBody);

    return Response.json(newTask, { status: 201 });
  } catch (err) {
    return handleApiError(err);
  }
});
