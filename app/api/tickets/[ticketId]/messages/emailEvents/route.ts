import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { getTicketEmailEvents } from '@/services/serverSide/message';

export const GET = withWorkspaceAuth(async (req, { ticketId }) => {
  try {
    const emailEvents = await getTicketEmailEvents(ticketId);

    return Response.json(emailEvents, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
