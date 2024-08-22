import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { getTicketMessages, postMessage } from '@/services/serverSide/message';
import { contentSchema, messageTypeSchema } from '@/lib/zod/message';

export const GET = withWorkspaceAuth(async (req, { ticketId }) => {
  try {
    const messages = await getTicketMessages(ticketId);

    return Response.json(messages, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});

const RequestBody = z.object({
  content: contentSchema,
  type: messageTypeSchema,
});
export const POST = withWorkspaceAuth(async (req, { ticketId }) => {
  try {
    const requestBody = await req.json();

    RequestBody.parse(requestBody);

    const { content, type } = requestBody;

    const newMessage = await postMessage({
      messageContent: content,
      messageType: type,
      referenceId: '',
      ticketId,
      authorId: req.user.id,
    });

    return Response.json(newMessage, { status: 201 });
  } catch (err) {
    return handleApiError(err);
  }
});
