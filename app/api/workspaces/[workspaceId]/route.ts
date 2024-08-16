import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { getWorkspaceById } from '@/services/serverSide/workspace';

export const GET = withWorkspaceAuth(async (req, { workspaceId }) => {
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
