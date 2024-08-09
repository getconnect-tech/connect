import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { getTicketLabels } from '@/services/serverSide/label';

export const GET = withWorkspaceAuth(async (req, { ticketId }) => {
  try {
    const labels = await getTicketLabels(ticketId);
    return Response.json(labels, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
