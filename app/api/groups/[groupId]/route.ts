import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import { nameSchema } from '@/lib/zod/common';
import { groupLabelSchema } from '@/lib/zod/group';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { customTraitsSchema } from '@/lib/zod/contact';
import { updateGroup } from '@/services/serverSide/group';

const UpdateGroupBody = z.object({
  name: nameSchema.optional(),
  groupLabel: groupLabelSchema.optional(),
  customTraits: customTraitsSchema.optional(),
});
export const PUT = withWorkspaceAuth(async (req, { groupId }) => {
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
