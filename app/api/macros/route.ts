import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import { titleSchema } from '@/lib/zod/macro';
import withAdminAuth from '@/middlewares/withAdminAuth';
import { createOrUpdateMacro as createMacro } from '@/services/serverSide/macro';
import { contentSchema } from '@/lib/zod/message';

const createRequestBody = z.object({
  title: titleSchema,
  content: contentSchema,
});

export const POST = withAdminAuth(async (req) => {
  try {
    const requestBody = await req.json();
    createRequestBody.parse(requestBody);
    const { title, content } = requestBody as z.infer<typeof createRequestBody>;
    const userId = req.user.id;
    const workspaceId = req.workspace.id;
    const macro = await createMacro(userId, workspaceId, '', {
      title,
      content,
    });
    return Response.json(macro, { status: 201 });
  } catch (err) {
    return handleApiError(err);
  }
});
