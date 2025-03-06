import { z } from 'zod';
import { TeamSize, UserRole } from '@prisma/client';
import { handleApiError } from '@/helpers/errorHandler';
import withAuth from '@/middlewares/withAuth';
import {
  addUserToWorkspace,
  createWorkspace,
  inviteUsers,
  updateWorkspace,
} from '@/services/serverSide/workspace';
import { getUserWorkspaces } from '@/services/serverSide/workspace';

import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import {
  createEnumSchema,
  createStringSchema,
  parseAndValidateRequest,
} from '@/lib/zod';

const CreateRequestBody = z.object({
  name: createStringSchema('name', {
    regex: /^[a-zA-Z ]{2,30}$/,
  }),
  teamSize: createEnumSchema('teamSize', TeamSize),
  industry: createStringSchema('industry', { min: 3 }),
  invitedUsers: z
    .array(
      z.object({
        email: createStringSchema('email', { email: true }),
        displayName: createStringSchema('displayName', {
          regex: /^[a-zA-Z ]{2,30}$/,
        }),
      }),
    )
    .optional(),
});
export const POST = withAuth(async (req) => {
  try {
    const { name, industry, teamSize, invitedUsers } =
      await parseAndValidateRequest(req, CreateRequestBody);
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
  name: createStringSchema('name', {
    regex: /^[a-zA-Z ]{2,30}$/,
  }).optional(),
  imageUrl: createStringSchema('imageUrl', { url: true }).optional(),
});

export const PUT = withWorkspaceAuth(async (req) => {
  try {
    const requestBody = await parseAndValidateRequest(req, UpdateRequestBody);

    const updatedWorkspace = await updateWorkspace(
      req.workspace.id,
      requestBody,
    );

    return Response.json(updatedWorkspace, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
