import { z } from 'zod';
import { UserRole } from '@prisma/client';
import { handleApiError } from '@/helpers/errorHandler';
import { imageUrlSchema, nameSchema } from '@/lib/zod/common';
import withAuth from '@/middlewares/withAuth';
import {
  addUserToWorkspace,
  createWorkspace,
  inviteUsers,
  updateWorkspace,
} from '@/services/serverSide/workspace';
import { getUserWorkspaces } from '@/services/serverSide/workspace';
import { industrySchema, teamSizeSchema } from '@/lib/zod/workspace';
import { invitedUsersSchema } from '@/lib/zod/user';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';

const CreateRequestBody = z.object({
  name: nameSchema,
  teamSize: teamSizeSchema,
  industry: industrySchema,
  invitedUsers: invitedUsersSchema.optional(),
});

export const POST = withAuth(async (req) => {
  try {
    const requestBody = await req.json();

    CreateRequestBody.parse(requestBody);

    const { name, teamSize, industry, invitedUsers } = requestBody as z.infer<
      typeof CreateRequestBody
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

const UpdateRequestBody = z.object({
  name: nameSchema.optional(),
  imageUrl: imageUrlSchema.optional(),
});

export const PUT = withWorkspaceAuth(async (req) => {
  try {
    const requestBody = await req.json();

    UpdateRequestBody.parse(requestBody);

    const updatedWorkspace = await updateWorkspace(
      req.workspace.id,
      requestBody,
    );

    return Response.json(updatedWorkspace, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
