import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { createLabel, getWorkspaceLabels } from '@/services/serverSide/label';
import { createStringSchema, parseAndValidateRequest } from '@/lib/zod';

export const GET = withWorkspaceAuth(async (req) => {
  try {
    const workspaceId = req.workspace.id;
    const labels = await getWorkspaceLabels(workspaceId);

    return Response.json(labels, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});

const CreateRequestBody = z.object({
  name: createStringSchema('name', {
    regex: /^[a-zA-Z ]{2,30}$/,
  }),
  icon: createStringSchema('icon'),
  color: createStringSchema('color').optional(),
});
export const POST = withWorkspaceAuth(async (req) => {
  try {
    const requestBody = await parseAndValidateRequest(req, CreateRequestBody);
    const workspaceId = req.workspace.id;

    const newLabel = await createLabel({ workspaceId, ...requestBody });

    return Response.json(newLabel, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
