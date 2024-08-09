import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { getWorkspaceTickets } from '@/services/serverSide/ticket';

export const GET = withWorkspaceAuth(async (req) => {
  try {
    const workspaceId = req.workspace.id;

    const tickets = await getWorkspaceTickets(workspaceId);

    return Response.json(tickets, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
