import { handleApiError } from '@/helpers/errorHandler';
import withAuth from '@/middlewares/withAuth';
import { getProjectUsers } from '@/services/serverSide/teamcamp';

export const GET = withAuth(async () => {
  try {
    const projectUsers = await getProjectUsers();
    return Response.json(projectUsers, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
