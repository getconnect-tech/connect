import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { createGroup, getWorkspaceGroups } from '@/services/serverSide/group';
import withAdminAuth from '@/middlewares/withAdminAuth';
import {
  createStringSchema,
  customTraitsSchema,
  parseAndValidateRequest,
} from '@/lib/zod';

export const GET = withWorkspaceAuth(async (req) => {
  try {
    const groups = await getWorkspaceGroups(req.workspace.id);

    return Response.json(groups, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});

const CreateRequestBody = z.object({
  name: createStringSchema('name'),
  groupLabel: createStringSchema('groupLabel'),
  customTraits: customTraitsSchema.optional(),
  externalId: createStringSchema('externalId', { id: true }).optional(),
  avatar: createStringSchema('avatar').optional(),
});
export const POST = withAdminAuth(async (req) => {
  try {
    const requestBody = await parseAndValidateRequest(req, CreateRequestBody);

    const newGroup = await createGroup(req.workspace.id, requestBody);

    return Response.json(newGroup, { status: 201 });
  } catch (err) {
    return handleApiError(err);
  }
});
