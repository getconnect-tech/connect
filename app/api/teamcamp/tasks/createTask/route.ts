import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import {
  createStringSchema,
  createNumberSchema,
  parseAndValidateRequest,
} from '@/lib/zod';
import withAuth from '@/middlewares/withAuth';
import { createTask } from '@/services/serverSide/teamcamp';

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
  ticketId: createStringSchema('ticketId', { id: true }),
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
