import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import withAdminAuth from '@/middlewares/withAdminAuth';
import {
  createOrUpdateMacro as createMacro,
  getMacros,
} from '@/services/serverSide/macro';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { createStringSchema, parseAndValidateRequest } from '@/lib/zod';

const CreateRequestBody = z.object({
  title: createStringSchema('title'),
  content: createStringSchema('content'),
});
export const POST = withAdminAuth(async (req) => {
  try {
    const { title, content } = await parseAndValidateRequest(
      req,
      CreateRequestBody,
    );

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

export const GET = withWorkspaceAuth(async (req) => {
  try {
    const workspaceId = req.workspace.id;
    const macro = await getMacros(workspaceId);
    return Response.json(macro, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
