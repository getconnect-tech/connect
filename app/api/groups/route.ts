import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { createGroup, getWorkspaceGroups } from '@/services/serverSide/group';
import { externalIdSchema } from '@/lib/zod/common';
import { groupLabelSchema, groupNameSchema } from '@/lib/zod/group';
import { avatarSchema, customTraitsSchema } from '@/lib/zod/contact';
import withAdminAuth from '@/middlewares/withAdminAuth';

export const GET = withWorkspaceAuth(async (req) => {
  try {
    const groups = await getWorkspaceGroups(req.workspace.id);

    return Response.json(groups, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});

const CreateGroupBody = z.object({
  name: groupNameSchema,
  groupLabel: groupLabelSchema,
  customTraits: customTraitsSchema.optional(),
  externalId: externalIdSchema.optional(),
  avatar: avatarSchema.optional(),
});
export const POST = withAdminAuth(async (req) => {
  try {
    const requestBody = await req.json();

    CreateGroupBody.parse(requestBody);

    const groupData = requestBody as z.infer<typeof CreateGroupBody>;

    const newGroup = await createGroup(req.workspace.id, groupData);

    return Response.json(newGroup, { status: 201 });
  } catch (err) {
    return handleApiError(err);
  }
});
