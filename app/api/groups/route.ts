import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { createGroup, getWorkspaceGroups } from '@/services/serverSide/group';
import { nameSchema } from '@/lib/zod/common';
import { groupLabelSchema } from '@/lib/zod/group';
import { customTraitsSchema } from '@/lib/zod/contact';

export const GET = withWorkspaceAuth(async (req) => {
  try {
    const groups = await getWorkspaceGroups(req.workspace.id);

    return Response.json(groups, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});

const CreateGroupBody = z.object({
  name: nameSchema,
  groupLabel: groupLabelSchema,
  customTraits: customTraitsSchema.optional(),
});
export const POST = withWorkspaceAuth(async (req) => {
  try {
    const requestBody = await req.json();

    CreateGroupBody.parse(requestBody);

    const { name, groupLabel } = requestBody as z.infer<typeof CreateGroupBody>;

    const newGroup = await createGroup(req.workspace.id, { name, groupLabel });

    return Response.json(newGroup, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
