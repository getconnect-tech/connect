import { MessageType } from '@prisma/client';
import { handleApiError } from '@/helpers/errorHandler';
import { statusSchema } from '@/lib/zod/ticket';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { postMessage } from '@/services/serverSide/message';
import { updateStatus } from '@/services/serverSide/ticket';

// PUT: /api/tickets/[ticketId]/changeStatus
export const PUT = withWorkspaceAuth(async (req, { ticketId }) => {
  try {
    const { status } = await req.json();

    statusSchema.parse(status);

    const updatedTicket = await updateStatus(ticketId, status);

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
