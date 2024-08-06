import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import { invitedUsersSchema } from '@/lib/zod';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { inviteUsers } from '@/services/serverSide/workspace';

export const POST = withWorkspaceAuth(async (req) => {
  try {
    const { invitedUsers } = await req.json();

    invitedUsersSchema.parse(invitedUsers);

    const usersToInvite = invitedUsers as z.infer<typeof invitedUsersSchema>;
    const user = req.user;
    const workspace = req.workspace;

    await inviteUsers(usersToInvite, workspace.id, user.id);

    return Response.json({ message: 'User invited!' }, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
