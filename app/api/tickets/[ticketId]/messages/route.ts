import { z } from 'zod';
import { EmailEventType, Message, MessageType } from '@prisma/client';
import { Attachment } from 'postmark';
import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import {
  createEmailEvent,
  getTicketMessages,
  postMessage,
  updateUserLastSeen,
} from '@/services/serverSide/message';
import {
  attachmentTokenSchema,
  contentSchema,
  messageTypeSchema,
} from '@/lib/zod/message';
import { sendEmailAsReply } from '@/helpers/emails';
import { getWorkspaceEmailConfig } from '@/services/serverSide/workspace';
import {
  getAttachmentsFromToken,
  moveAttachments,
} from '@/services/serverSide/firebaseServices';

export const GET = withWorkspaceAuth(async (req, { ticketId }) => {
  try {
    await updateUserLastSeen(ticketId, req.user.id);

    const messages = await getTicketMessages(ticketId);

    return Response.json(messages, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});

const RequestBody = z.object({
  content: contentSchema,
  type: messageTypeSchema,
  attachmentToken: attachmentTokenSchema.optional(),
});
export const POST = withWorkspaceAuth(async (req, { ticketId }) => {
  try {
    const requestBody = await req.json();

    RequestBody.parse(requestBody);

    const { content, type, attachmentToken } = requestBody as z.infer<
      typeof RequestBody
    >;
    const workspaceId = req.workspace.id;
    const userId = req.user.id;

    if (type === MessageType.REGULAR) {
      const newMessage = await postMessage({
        messageContent: content,
        messageType: type,
        referenceId: '',
        ticketId,
        authorId: userId,
      });

      await updateUserLastSeen(ticketId, userId);

      if (attachmentToken) {
        await moveAttachments(
          workspaceId,
          ticketId,
          newMessage.id,
          attachmentToken,
        );
      }

      return Response.json(newMessage, { status: 201 });
    }

    if (type === MessageType.EMAIL) {
      const emailConfig = await getWorkspaceEmailConfig(req.workspace.id);

      if (!emailConfig) {
        return Response.json(
          {
            error:
              'Email configuration not found. Please setup a support email under the workspace settings.',
          },
          { status: 404 },
        );
      }

      let newMessage: Message;
      try {
        let attachments: Attachment[] = [];
        if (attachmentToken) {
          attachments = await getAttachmentsFromToken(
            workspaceId,
            ticketId,
            attachmentToken,
          );
        }
        const mailId = await sendEmailAsReply({
          ticketId,
          body: content,
          senderEmail: emailConfig.primaryEmail,
          attachments,
        });

        if (!mailId) {
          return Response.json({ error: 'Ticket not found!' }, { status: 404 });
        }

        newMessage = await postMessage({
          messageContent: content,
          messageType: type,
          referenceId: mailId,
          ticketId: ticketId,
          authorId: req.user.id,
        });
      } catch (err: any) {
        newMessage = await postMessage({
          messageContent: content,
          messageType: type,
          referenceId: '',
          ticketId: ticketId,
          authorId: req.user.id,
        });

        await createEmailEvent(newMessage.id, {
          eventType: EmailEventType.FAILED,
          extra: err.message,
        });
      } finally {
        await updateUserLastSeen(ticketId, userId);

        if (attachmentToken) {
          await moveAttachments(
            workspaceId,
            ticketId,
            newMessage!.id,
            attachmentToken,
          );
        }
      }

      return Response.json(newMessage, { status: 201 });
    }

    return Response.json({ error: 'Invalid message type!' }, { status: 400 });
  } catch (err) {
    return handleApiError(err);
  }
});
