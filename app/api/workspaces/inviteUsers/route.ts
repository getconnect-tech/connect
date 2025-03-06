import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { inviteUsers } from '@/services/serverSide/workspace';
import { createStringSchema, parseAndValidateRequest } from '@/lib/zod';

const CreateRequestBody = z.object({
  invitedUsers: z.array(
    z.object({
      email: createStringSchema('email', { email: true }),
      displayName: createStringSchema('displayName', {
        regex: /^[a-zA-Z ]{2,30}$/,
      }),
    }),
  ),
});
export const POST = withWorkspaceAuth(async (req) => {
  try {
    const { invitedUsers } = await parseAndValidateRequest(
      req,
      CreateRequestBody,
    );

    const userId = req.user.id;
    const workspaceId = req.workspace.id;

    await inviteUsers(invitedUsers, workspaceId, userId);

    return Response.json({ message: 'User invited!' }, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
