import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import { createStringSchema, parseAndValidateRequest } from '@/lib/zod';
import withAdminAuth from '@/middlewares/withAdminAuth';
import {
  createOrUpdateMacro as updateMacro,
  deleteMacro,
} from '@/services/serverSide/macro';

const UpdateRequestBody = z.object({
  title: createStringSchema('title'),
  content: createStringSchema('content'),
});
export const PUT = withAdminAuth(async (req, { macroId }) => {
  try {
    const requestBody = await parseAndValidateRequest(req, UpdateRequestBody);
    const userId = req.user.id;
    const workspaceId = req.workspace.id;

    const macro = await updateMacro(userId, workspaceId, macroId, requestBody);
    return Response.json(macro, { status: 201 });
  } catch (err) {
    return handleApiError(err);
  }
});

export const DELETE = withAdminAuth(async (req, { macroId }) => {
  try {
    const result = await deleteMacro(macroId);
    if (result)
      return Response.json('Macro successfully deleted.', { status: 201 });
    else throw new Error('Failed to delete macro.');
  } catch (err) {
    return handleApiError(err);
  }
});
