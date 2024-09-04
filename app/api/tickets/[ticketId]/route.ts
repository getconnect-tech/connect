import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { getTicketById } from '@/services/serverSide/ticket';

// GET /api/tickets/[ticketId]
export const GET = withWorkspaceAuth(async (req, { ticketId }) => {
  try {
    const workspaceId = req.workspace.id;

    const ticket = await getTicketById(ticketId, workspaceId);

    if (!ticket) {
      return Response.json({ error: 'Not found!' }, { status: 404 });
    }

    return Response.json(ticket, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
