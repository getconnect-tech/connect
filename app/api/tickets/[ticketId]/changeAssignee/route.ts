import { ChannelType, MessageType } from '@prisma/client';
import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';

import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { postMessage } from '@/services/serverSide/message';
import { updateAssignee } from '@/services/serverSide/ticket';
import { NotificationProvider } from '@/services/serverSide/notifications';
import { createStringSchema, parseAndValidateRequest } from '@/lib/zod';

// PUT: /api/tickets/[ticketId]/changeAssignee
const UpdateRequestBody = z.object({
  assignee: createStringSchema('assignee', { id: true }).or(z.null()),
});
export const PUT = withWorkspaceAuth(async (req, { ticketId }) => {
  try {
    const { assignee } = await parseAndValidateRequest(req, UpdateRequestBody);

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
      NotificationProvider.notifyTicketAssignment(
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
