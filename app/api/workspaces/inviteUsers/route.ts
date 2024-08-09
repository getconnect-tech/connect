import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { inviteUsers } from '@/services/serverSide/workspace';
import { invitedUsersSchema } from '@/lib/zod/user';

export const POST = withWorkspaceAuth(async (req) => {
  try {
    const { invitedUsers } = await req.json();

    invitedUsersSchema.parse(invitedUsers);

    const usersToInvite = invitedUsers as z.infer<typeof invitedUsersSchema>;

    const userId = req.user.id;
    const workspaceId = req.workspace.id;

    await inviteUsers(usersToInvite, workspaceId, userId);

    return Response.json({ message: 'User invited!' }, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
