import { ChannelType, MessageType } from '@prisma/client';
import { handleApiError } from '@/helpers/errorHandler';
import { prioritySchema } from '@/lib/zod/ticket';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { postMessage } from '@/services/serverSide/message';
import { updatePriority } from '@/services/serverSide/ticket';

// PUT: /api/tickets/[ticketId]/changePriority
export const PUT = withWorkspaceAuth(async (req, { ticketId }) => {
  try {
    const { priority } = await req.json();

    prioritySchema.parse(priority);

    const updatedTicket = await updatePriority(ticketId, priority);

    const userId = req.user.id;
    await postMessage({
      messageContent: '',
      referenceId: priority,
      messageType: MessageType.CHANGE_PRIORITY,
      ticketId,
      authorId: userId,
      channel: ChannelType.INTERNAL,
    });

    return Response.json(updatedTicket, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
