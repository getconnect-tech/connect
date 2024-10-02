import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { getTicketSummaryAndSentiment } from '@/services/serverSide/ticketSummary';

// GET: /api/tickets/[ticketId]/generateSummary
export const GET = withWorkspaceAuth(async (req, { ticketId }) => {
  try {
    const ticketAnalysisResult = await getTicketSummaryAndSentiment(ticketId);

    return Response.json(ticketAnalysisResult, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
