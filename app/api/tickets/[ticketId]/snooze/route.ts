import { ChannelType, MessageType, TicketStatus } from '@prisma/client';
import moment from 'moment';
import { handleApiError } from '@/helpers/errorHandler';
import { snoozeUntilSchema } from '@/lib/zod/ticket';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { postMessage } from '@/services/serverSide/message';
import { updateTicket } from '@/services/serverSide/ticket';

export const PUT = withWorkspaceAuth(async (req, { ticketId }) => {
  try {
    const { snoozeUntil } = await req.json();

    snoozeUntilSchema.parse(snoozeUntil);
    if (new Date(snoozeUntil).getTime() <= new Date().getTime()) {
      return Response.json(
        { error: "'snoozeUntil' date must be in future!" },
        { status: 422 },
      );
    }

    const updatedTicket = await updateTicket(ticketId, {
      status: TicketStatus.OPEN,
      snoozeUntil,
    });

    const snoozeUntilDate = moment(snoozeUntil).format('DD MMMM LT');
    await postMessage({
      messageContent: snoozeUntilDate,
      messageType: MessageType.CHANGE_STATUS,
      referenceId: 'SNOOZE',
      ticketId,
      authorId: req.user.id,
      channel: ChannelType.INTERNAL,
    });

    return Response.json(updatedTicket, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
