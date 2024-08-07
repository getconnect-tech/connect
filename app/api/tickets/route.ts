import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';

export const GET = withWorkspaceAuth(async (req) => {
  try {
    const workspace = req.workspace;
    return Response.json(workspace.tickets, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
