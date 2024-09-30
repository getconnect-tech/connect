import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { getContactActivites } from '@/services/serverSide/getContactActivites';

// GET: /api/contacts/getActivites
export const GET = withWorkspaceAuth(async (req) => {
  try {
    const userActivity = await getContactActivites(req.user.id);
    return Response.json({ userActivityData: userActivity }, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
