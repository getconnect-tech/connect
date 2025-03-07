import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import { createStringSchema, parseAndValidateRequest } from '@/lib/zod';
import withAuth from '@/middlewares/withAuth';
import { getTasks } from '@/services/serverSide/teamcamp';

const RequestBody = z.object({
  taskIds: z.array(createStringSchema('taskIds')),
});
export const POST = withAuth(async (req) => {
  try {
    const { taskIds } = await parseAndValidateRequest(req, RequestBody);

    const tasks = await getTasks(taskIds);

    return Response.json(tasks, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
