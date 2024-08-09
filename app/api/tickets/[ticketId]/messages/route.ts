import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { getTicketMessages } from '@/services/serverSide/message';

export const GET = withWorkspaceAuth(async (req, { ticketId }) => {
  try {
    const messages = await getTicketMessages(ticketId);

    return Response.json(messages, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
