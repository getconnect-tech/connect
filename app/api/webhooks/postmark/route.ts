import { NextRequest } from 'next/server';
import {
  ChannelType,
  EmailEventType,
  MessageType,
  TicketStatus,
} from '@prisma/client';
import { handleApiError } from '@/helpers/errorHandler';
import { createTicket, getTicketByMailId } from '@/services/serverSide/ticket';
import { createEmailEvent, postMessage } from '@/services/serverSide/message';
import { hasWorkspace } from '@/services/serverSide/workspace';
import {
  isBounceOutbound,
  isDeliveryOutbound,
  isInbound,
  isLinkClickOutbound,
  isOpenOutbound,
  isOutbound,
  WebhookPayload,
} from '@/utils/webhookPayloadType';
import { prisma } from '@/prisma/prisma';
import { uploadWebhookAttachments } from '@/services/serverSide/firebaseServices';
import { NotificationProvider } from '@/services/serverSide/notifications';
import { htmlToString } from '@/helpers/common';

export const POST = async (req: NextRequest) => {
  try {
    const postmarkPayload = (await req.json()) as WebhookPayload;

    if (isInbound(postmarkPayload)) {
      const references = postmarkPayload.headers['References'] || [];
      const mailId = postmarkPayload.headers['Message-Id']![0];
      const referenceId =
        references.length > 0 ? references[0].split(' ')[0] : mailId;

      if (postmarkPayload.recipients.length <= 0) {
        return Response.json(
          { message: 'No recipients found!' },
          { status: 200 },
        );
      }

      const workspaceId = postmarkPayload.recipients[0].split('@')[0]!;

      const isWorkspaceExists = await hasWorkspace(workspaceId);

      if (!isWorkspaceExists) {
        return new Response('Workspace not found!', { status: 200 });
      }

      let isNewTicket = false;
      let ticket = await getTicketByMailId(referenceId);

      if (!ticket) {
        const subject = postmarkPayload.headers['Subject']![0];
        const senderEmail = postmarkPayload.headers['X-Original-Sender']![0];

        const from = postmarkPayload.headers['From']![0];
        const match = from.match(/^(.*?)\s*<.*?>$/);
        const senderName = match ? match[1].trim() : from.trim();

        ticket = await createTicket({
          mailId: referenceId,
          subject,
          workspaceId: workspaceId,
          senderEmail,
          senderName,
          source: ChannelType.MAIL,
        });

        isNewTicket = true;
      }

      if (ticket.status === TicketStatus.CLOSED) {
        await prisma.ticket.update({
          where: { id: ticket.id },
          data: { status: TicketStatus.OPEN },
        });
      }

      const message = await postMessage({
        messageContent: postmarkPayload.body.html,
        messageType: MessageType.FROM_CONTACT,
        referenceId: mailId,
        ticketId: ticket.id,
        channel: ChannelType.MAIL,
      });

      const attachments = postmarkPayload.attachments || [];
      if (attachments.length > 0) {
        await uploadWebhookAttachments(
          workspaceId,
          ticket.id,
          message.id,
          attachments,
        );
      }

      const messageContent = htmlToString(message.content);

      try {
        await NotificationProvider.notifyNewMessage(
          ticket.contact_id,
          ticket.id,
          messageContent,
          true,
          isNewTicket,
        );
      } catch (err) {
        console.error('Error sending notification: ', err);
        return new Response('Received!', { status: 200 });
      }
    }

    if (isOutbound(postmarkPayload)) {
      let eventType: EmailEventType;
      let extra: string = '';

      if (isDeliveryOutbound(postmarkPayload)) {
        eventType = EmailEventType.DELIVERED;
        extra = postmarkPayload.event_data.to[0];

        if (postmarkPayload.tags && postmarkPayload.tags.length > 0) {
          const referenceId = postmarkPayload.tags.find(
            (tag) => tag.name === 'reference_id',
          )?.value;

          if (referenceId) {
            const ticket = await getTicketByMailId(referenceId);
            if (ticket) {
              await prisma.ticket.update({
                where: { id: ticket.id },
                data: { mail_id: postmarkPayload.message_id },
              });
            }
          }
        }
      }

      const mailId = postmarkPayload.message_id;

      const message = await prisma.message.findFirst({
        where: { reference_id: mailId, type: MessageType.EMAIL },
        select: { id: true },
      });

      if (!message) {
        return new Response('Message not found!', { status: 200 });
      }

      const messageId = message.id;

      if (isOpenOutbound(postmarkPayload)) {
        eventType = EmailEventType.OPENED;
        extra = postmarkPayload.event_data.ip;
      }

      if (isBounceOutbound(postmarkPayload)) {
        eventType = EmailEventType.BOUNCED;
        extra = postmarkPayload.event_data.reason;
      }

      if (isLinkClickOutbound(postmarkPayload)) {
        eventType = EmailEventType.LINK_CLICKED;
        extra = postmarkPayload.event_data.original_url;
      }

      await createEmailEvent(messageId, { eventType: eventType!, extra });
    }

    return new Response('Received!', { status: 200 });
  } catch (err) {
    console.error(err);
    return handleApiError(err);
  }
};
