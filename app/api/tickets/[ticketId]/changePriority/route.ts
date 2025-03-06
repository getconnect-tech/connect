import { ChannelType, MessageType, PriorityLevels } from '@prisma/client';
import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { postMessage } from '@/services/serverSide/message';
import { updatePriority } from '@/services/serverSide/ticket';
import { createEnumSchema, parseAndValidateRequest } from '@/lib/zod';

// PUT: /api/tickets/[ticketId]/changePriority
const UpdateRequestBody = z.object({
  priority: createEnumSchema('priority', PriorityLevels),
});
export const PUT = withWorkspaceAuth(async (req, { ticketId }) => {
  try {
    const { priority } = await parseAndValidateRequest(req, UpdateRequestBody);

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
