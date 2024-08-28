import { handleApiError } from '@/helpers/errorHandler';
import { nameSchema } from '@/lib/zod/common';
import withAdminAuth from '@/middlewares/withAdminAuth';
import {
  createApiKey,
  getWorkspaceApiKeys,
} from '@/services/serverSide/apiKey';

export const GET = withAdminAuth(async (req) => {
  try {
    const apiKeys = await getWorkspaceApiKeys(req.workspace.id);

    return Response.json(apiKeys, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});

export const POST = withAdminAuth(async (req) => {
  try {
    const { name } = await req.json();

    nameSchema.parse(name);

    const userId = req.user.id;
    const workspaceId = req.workspace.id;

    const apiKey = await createApiKey({ userId, workspaceId, name });

    return Response.json(apiKey, { status: 201 });
  } catch (err) {
    return handleApiError(err);
  }
});
