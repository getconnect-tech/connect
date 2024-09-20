import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import {
  getTicketContent,
  getTicketSentiment,
  getTicketSummary,
} from '@/services/serverSide/ticketSummary';

// GET: /api/tickets/[ticketId]/generateSummary
export const GET = withWorkspaceAuth(async (req, { ticketId }) => {
  try {
    const messageData = await getTicketContent(ticketId);

    const [ticketSummary, ticketSentiment] = await Promise.all([
      getTicketSummary(ticketId, messageData),
      getTicketSentiment(ticketId, messageData),
    ]);

    return Response.json({ ticketSummary, ticketSentiment }, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
