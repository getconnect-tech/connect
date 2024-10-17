import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import { externalIdSchema } from '@/lib/zod/common';
import { groupLabelSchema, groupNameSchema } from '@/lib/zod/group';
import { avatarSchema, customTraitsSchema } from '@/lib/zod/contact';
import { updateGroup } from '@/services/serverSide/group';
import withAdminAuth from '@/middlewares/withAdminAuth';

const UpdateGroupBody = z.object({
  name: groupNameSchema.optional(),
  groupLabel: groupLabelSchema.optional(),
  customTraits: customTraitsSchema.optional(),
  externalId: externalIdSchema.optional(),
  avatar: avatarSchema.optional(),
});
export const PUT = withAdminAuth(async (req, { groupId }) => {
  try {
    const requestBody = await req.json();

    UpdateGroupBody.parse(requestBody);

    const groupData = requestBody as z.infer<typeof UpdateGroupBody>;
    const updatedGroup = await updateGroup(groupId, groupData);

    return Response.json(updatedGroup, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
