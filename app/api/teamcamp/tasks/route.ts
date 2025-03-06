import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import withAuth from '@/middlewares/withAuth';
import { createTask, getTasks } from '@/services/serverSide/teamcamp';
import {
  createNumberSchema,
  createStringSchema,
  parseAndValidateRequest,
} from '@/lib/zod';

export const GET = withAuth(async () => {
  try {
    const tasks = await getTasks();

    return Response.json(tasks, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});

const CreateRequestBody = z.object({
  taskName: createStringSchema('taskName'),
  description: createStringSchema('description'),
  priority: createNumberSchema('priority'),
  taskUsers: z.array(createStringSchema('taskUsers')),
  files: z.array(
    z.object({
      fileType: createStringSchema('fileType'),
      href: createStringSchema('href'),
      name: createStringSchema('name'),
      size: createStringSchema('size'),
    }),
  ),
});
export const POST = withAuth(async (req) => {
  try {
    const requestBody = await parseAndValidateRequest(req, CreateRequestBody);

    const newTask = await createTask(requestBody);

    return Response.json(newTask, { status: 201 });
  } catch (err) {
    return handleApiError(err);
  }
});
