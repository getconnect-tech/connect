import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import withAdminAuth from '@/middlewares/withAdminAuth';
import {
  createApiKey,
  getWorkspaceApiKeys,
} from '@/services/serverSide/apiKey';
import { createStringSchema, parseAndValidateRequest } from '@/lib/zod';

export const GET = withAdminAuth(async (req) => {
  try {
    const apiKeys = await getWorkspaceApiKeys(req.workspace.id);

    return Response.json(apiKeys, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});

const CreateRequestBody = z.object({
  name: createStringSchema('name', {
    regex: /^[a-zA-Z ]{2,30}$/,
  }),
});
export const POST = withAdminAuth(async (req) => {
  try {
    const { name } = await parseAndValidateRequest(req, CreateRequestBody);

    const userId = req.user.id;
    const workspaceId = req.workspace.id;

    const apiKey = await createApiKey({ userId, workspaceId, name });

    return Response.json(apiKey, { status: 201 });
  } catch (err) {
    return handleApiError(err);
  }
});
