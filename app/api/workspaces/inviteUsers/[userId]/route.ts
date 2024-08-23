import { handleApiError } from '@/helpers/errorHandler';
import withAdminAuth from '@/middlewares/withAdminAuth';
import { removeInvitedUser } from '@/services/serverSide/workspace';

export const DELETE = withAdminAuth(async (req, { userId }) => {
  try {
    const deletedUser = await removeInvitedUser(userId);

    return Response.json(deletedUser, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
