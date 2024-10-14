import { z } from 'zod';
import {
  ChannelType,
  EmailEventType,
  Message,
  MessageType,
} from '@prisma/client';
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
import { sendEmail, sendEmailAsReply } from '@/helpers/emails';
import {
  getAttachmentsFromToken,
  moveAttachments,
} from '@/services/serverSide/firebaseServices';
import { prisma } from '@/prisma/prisma';
import { NotificationProvider } from '@/services/serverSide/notifications';
import { getWorkspaceConfig } from '@/services/serverSide/workspace';

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
        channel: ChannelType.INTERNAL,
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

      NotificationProvider.notifyMentions(userId, ticketId, content);

      NotificationProvider.notifyNewMessage(userId, ticketId, content);

      return Response.json(newMessage, { status: 201 });
    }

    if (type === MessageType.EMAIL) {
      const workspaceConfig = await getWorkspaceConfig(req.workspace.id);

      if (!workspaceConfig?.emailChannel?.primaryEmail) {
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
        const ticket = await prisma.ticket.findUnique({
          where: { id: ticketId },
          select: {
            mail_id: true,
            source: true,
            subject: true,
            contact: {
              select: {
                email: true,
              },
            },
          },
        });

        if (!ticket) {
          return Response.json({ error: 'Ticket not found!' }, { status: 404 });
        }

        let attachments: Attachment[] = [];
        if (attachmentToken) {
          attachments = await getAttachmentsFromToken(
            workspaceId,
            ticketId,
            attachmentToken,
          );
        }

        let mailId: string;
        if (ticket.source === ChannelType.WEB && !ticket.mail_id) {
          // The ticket was from web and this is first email in the ticket

          mailId = await sendEmail({
            email: ticket.contact.email,
            subject: ticket.subject,
            body: content,
            senderEmail: workspaceConfig.emailChannel.primaryEmail,
            attachments,
          });

          const referenceMailId = `<${mailId}@mtasv.net>`;

          await prisma.ticket.update({
            where: { id: ticketId },
            data: { mail_id: referenceMailId },
          });
        } else {
          mailId = (await sendEmailAsReply({
            ticketId,
            body: content,
            senderEmail: workspaceConfig.emailChannel.primaryEmail,
            attachments,
          }))!;
        }

        newMessage = await postMessage({
          messageContent: content,
          messageType: type,
          referenceId: mailId,
          ticketId: ticketId,
          authorId: req.user.id,
          channel: ChannelType.MAIL,
        });
      } catch (err: any) {
        newMessage = await postMessage({
          messageContent: content,
          messageType: type,
          referenceId: '',
          ticketId: ticketId,
          authorId: req.user.id,
          channel: ChannelType.MAIL,
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

      NotificationProvider.notifyNewMessage(userId, ticketId, content);

      return Response.json(newMessage, { status: 201 });
    }

    return Response.json({ error: 'Invalid message type!' }, { status: 400 });
  } catch (err) {
    return handleApiError(err);
  }
});
