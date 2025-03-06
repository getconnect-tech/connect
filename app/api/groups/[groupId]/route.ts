import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import { updateGroup } from '@/services/serverSide/group';
import withAdminAuth from '@/middlewares/withAdminAuth';
import {
  createStringSchema,
  customTraitsSchema,
  parseAndValidateRequest,
} from '@/lib/zod';

const UpdateRequestBody = z.object({
  name: createStringSchema('name').optional(),
  groupLabel: createStringSchema('groupLabel').optional(),
  customTraits: customTraitsSchema.optional(),
  externalId: createStringSchema('externalId', { id: true }).optional(),
  avatar: createStringSchema('avatar').optional(),
});
export const PUT = withAdminAuth(async (req, { groupId }) => {
  try {
    const requestBody = await parseAndValidateRequest(req, UpdateRequestBody);

    const updatedGroup = await updateGroup(groupId, requestBody);

    return Response.json(updatedGroup, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
