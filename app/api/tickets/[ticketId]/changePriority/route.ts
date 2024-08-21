import { handleApiError } from '@/helpers/errorHandler';
import { prioritySchema } from '@/lib/zod/ticket';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { updatePriority } from '@/services/serverSide/ticket';

// PUT: /api/tickets/[ticketId]/changePriority
export const PUT = withWorkspaceAuth(async (req, { ticketId }) => {
  try {
    const { priority } = await req.json();

    prioritySchema.parse(priority);

    const updatedTicket = await updatePriority(ticketId, priority);

    return Response.json(updatedTicket, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
