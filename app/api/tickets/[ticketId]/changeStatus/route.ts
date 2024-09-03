import { MessageType, TicketStatus } from '@prisma/client';
import { handleApiError } from '@/helpers/errorHandler';
import { snoozeUntilSchema, statusSchema } from '@/lib/zod/ticket';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { postMessage } from '@/services/serverSide/message';
import { updateStatus } from '@/services/serverSide/ticket';

// PUT: /api/tickets/[ticketId]/changeStatus
export const PUT = withWorkspaceAuth(async (req, { ticketId }) => {
  try {
    const { status, snoozeUntil } = await req.json();

    statusSchema.parse(status);

    if (status === TicketStatus.SNOOZE) {
      snoozeUntilSchema.parse(snoozeUntil);
    }

    const updatedTicket = await updateStatus(ticketId, status, snoozeUntil);

    const userId = req.user.id;
    await postMessage({
      messageContent: '',
      referenceId: status,
      messageType: MessageType.CHANGE_STATUS,
      ticketId,
      authorId: userId,
    });

    return Response.json(updatedTicket, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
