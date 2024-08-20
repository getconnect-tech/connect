import { handleApiError } from '@/helpers/errorHandler';
import withAuth from '@/middlewares/withAuth';
import { getWorkspaceById } from '@/services/serverSide/workspace';

export const GET = withAuth(async (_req, { workspaceId }) => {
  try {
    const workspace = await getWorkspaceById(workspaceId);

    if (!workspace) {
      return Response.json({ error: 'Not found!' }, { status: 404 });
    }

    return Response.json(workspace, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
