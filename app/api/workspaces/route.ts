import { z } from 'zod';
import { UserRole } from '@prisma/client';
import { handleApiError } from '@/helpers/errorHandler';
import { nameSchema } from '@/lib/zod/common';
import withAuth from '@/middlewares/withAuth';
import {
  addUserToWorkspace,
  createWorkspace,
  inviteUsers,
} from '@/services/serverSide/workspace';
import { getUserWorkspaces } from '@/services/serverSide/workspace';
import { industrySchema, teamSizeSchema } from '@/lib/zod/workspace';
import { invitedUsersSchema } from '@/lib/zod/user';

const RequestBody = z.object({
  name: nameSchema,
  teamSize: teamSizeSchema,
  industry: industrySchema,
  invitedUsers: invitedUsersSchema.optional(),
});

export const POST = withAuth(async (req) => {
  try {
    const requestBody = await req.json();

    RequestBody.parse(requestBody);

    const { name, teamSize, industry, invitedUsers } = requestBody as z.infer<
      typeof RequestBody
    >;
    const user = req.user;

    const newWorkspace = await createWorkspace({ name, industry, teamSize });
    await addUserToWorkspace(newWorkspace.id, user.id, UserRole.OWNER);
    if (invitedUsers) {
      await inviteUsers(invitedUsers, newWorkspace.id, user.id);
    }

    return Response.json(newWorkspace, { status: 201 });
  } catch (err) {
    return handleApiError(err);
  }
});

export const GET = withAuth(async (req) => {
  try {
    const userWorkspaces = await getUserWorkspaces(req.user.id);
    return Response.json(userWorkspaces, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
