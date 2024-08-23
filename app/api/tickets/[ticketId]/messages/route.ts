import { z } from 'zod';
import { MessageType } from '@prisma/client';
import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { getTicketMessages, postMessage } from '@/services/serverSide/message';
import { contentSchema, messageTypeSchema } from '@/lib/zod/message';
import { sendEmailAsReply } from '@/helpers/emails';

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

    const { content, type } = requestBody as z.infer<typeof RequestBody>;

    if (type === MessageType.REGULAR) {
      const newMessage = await postMessage({
        messageContent: content,
        messageType: type,
        referenceId: '',
        ticketId,
        authorId: req.user.id,
      });

      return Response.json(newMessage, { status: 201 });
    }

    if (type === MessageType.EMAIL) {
      const mailId = await sendEmailAsReply(ticketId, content);

      if (!mailId) {
        return Response.json({ error: 'Ticket not found!' }, { status: 404 });
      }

      const newMessage = await postMessage({
        messageContent: content,
        messageType: type,
        referenceId: mailId,
        ticketId: ticketId,
        authorId: req.user.id,
      });

      return Response.json(newMessage, { status: 201 });
    }

    return Response.json({ error: 'Invalid message type!' }, { status: 400 });
  } catch (err) {
    return handleApiError(err);
  }
});
