import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';

export const GET = withWorkspaceAuth(async (req, params) => {
  try {
    const ticketId = params.ticketId;
    const ticket = req.workspace.tickets.find(
      (ticket) => ticket.id === ticketId,
    );

    if (!ticket) {
      return Response.json({ error: 'Not found!' }, { status: 404 });
    }

    return Response.json(ticket, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
