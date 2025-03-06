import { UserRole } from '@prisma/client';
import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import { createEnumSchema, parseAndValidateRequest } from '@/lib/zod';
import withAdminAuth from '@/middlewares/withAdminAuth';
import {
  removeUserFromWorkspace,
  updateUser,
} from '@/services/serverSide/workspace';

const UpdateRequestBody = z.object({
  role: createEnumSchema('role', UserRole).optional(),
});
export const PUT = withAdminAuth(async (req, { userId }) => {
  try {
    const { role } = await parseAndValidateRequest(req, UpdateRequestBody);

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
