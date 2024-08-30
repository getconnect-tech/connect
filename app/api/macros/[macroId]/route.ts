import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import { createRequestBody } from '@/lib/zod/macro';
import withAdminAuth from '@/middlewares/withAdminAuth';
import { createOrUpdateMacro as updateMacro } from '@/services/serverSide/macro';

export const PUT = withAdminAuth(async (req, { macroId }) => {
  try {
    const requestBody = await req.json();
    createRequestBody.parse(requestBody);
    const { title, content } = requestBody as z.infer<typeof createRequestBody>;
    const userId = req.user.id;
    const workspaceId = req.workspace.id;
    const macro = await updateMacro(userId, workspaceId, macroId, {
      title,
      content,
    });
    return Response.json(macro, { status: 201 });
  } catch (err) {
    return handleApiError(err);
  }
});
