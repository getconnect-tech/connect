import { ChannelType, MessageType, TicketStatus } from '@prisma/client';
import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { postMessage } from '@/services/serverSide/message';
import { updateStatus } from '@/services/serverSide/ticket';
import {
  createEnumSchema,
  createStringSchema,
  parseAndValidateRequest,
} from '@/lib/zod';

// PUT: /api/tickets/[ticketId]/changeStatus
const UpdateRequestBody = z.object({
  status: createEnumSchema('status', TicketStatus),
  snoozeUntil: createStringSchema('snoozeUntil', { datetime: true }).optional(),
});
export const PUT = withWorkspaceAuth(async (req, { ticketId }) => {
  try {
    const { status, snoozeUntil } = await parseAndValidateRequest(
      req,
      UpdateRequestBody,
    );

    let snoozeUntilTime: string | undefined = undefined;
    if (status === TicketStatus.OPEN && snoozeUntil) {
      snoozeUntilTime = snoozeUntil as string;
    }

    const updatedTicket = await updateStatus(ticketId, status, snoozeUntilTime);

    const userId = req.user.id;
    await postMessage({
      messageContent: '',
      referenceId: status,
      messageType: MessageType.CHANGE_STATUS,
      ticketId,
      authorId: userId,
      channel: ChannelType.INTERNAL,
    });

    return Response.json(updatedTicket, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
