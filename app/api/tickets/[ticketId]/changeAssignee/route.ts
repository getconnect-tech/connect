import { ChannelType, MessageType } from '@prisma/client';
import { handleApiError } from '@/helpers/errorHandler';
import { assignToSchema } from '@/lib/zod/ticket';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { postMessage } from '@/services/serverSide/message';
import { getTicketById, updateAssignee } from '@/services/serverSide/ticket';
import { NotificationProvider } from '@/services/serverSide/notifications';
import { getUserById } from '@/services/serverSide/user';

// PUT: /api/tickets/[ticketId]/changeAssignee
export const PUT = withWorkspaceAuth(async (req, { ticketId }) => {
  try {
    const { assignee } = await req.json();

    assignToSchema.parse(assignee);

    const updatedTicket = await updateAssignee(ticketId, assignee);

    const userId = req.user.id;
    await postMessage({
      messageContent: '',
      referenceId: assignee || '',
      messageType: MessageType.CHANGE_ASSIGNEE,
      ticketId,
      authorId: userId,
      channel: ChannelType.INTERNAL,
    });

    if (assignee) {
      NotificationProvider.sendAssignTicketNotification(
        req.user.id,
        assignee,
        ticketId,
      );
    }

    return Response.json(updatedTicket, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
