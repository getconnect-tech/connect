import { handleApiError } from '@/helpers/errorHandler';
import { roleSchema } from '@/lib/zod/workspace';
import withAdminAuth from '@/middlewares/withAdminAuth';
import {
  removeUserFromWorkspace,
  updateUser,
} from '@/services/serverSide/workspace';

export const PUT = withAdminAuth(async (req, { userId }) => {
  try {
    const { role } = await req.json();

    roleSchema.optional().parse(role);

    const workspaceId = req.workspace.id;

    const updatedRelation = await updateUser({
      workspaceId,
      userId,
      userUpdates: { role },
    });

    return Response.json(updatedRelation, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});

export const DELETE = withAdminAuth(async (req, { userId }) => {
  try {
    const workspaceId = req.workspace.id;

    await removeUserFromWorkspace(workspaceId, userId);

    return Response.json({ message: 'User removed!' }, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
