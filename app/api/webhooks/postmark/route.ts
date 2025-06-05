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
      const referenceId = references[0] || mailId;

      const workspaceId = postmarkPayload.recipients[0].split('@')[0]!;

      const isWorkspaceExists = await hasWorkspace(workspaceId);

      if (!isWorkspaceExists) {
        return new Response('Workspace not found!', { status: 200 });
      }

      let ticket = await getTicketByMailId(referenceId);

      if (!ticket) {
        const subject = postmarkPayload.headers['Subject']![0];

        const from = postmarkPayload.headers['From']![0];
        const match = from.match(/^(.*?)\s*<.*?>$/);
        const senderName = match ? match[1].trim() : from.trim();

        ticket = await createTicket({
          mailId: referenceId,
          subject,
          workspaceId: workspaceId,
          senderEmail: postmarkPayload.envelope_sender,
          senderName,
          source: ChannelType.MAIL,
        });
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
      await NotificationProvider.notifyNewMessage(
        ticket.contact_id,
        ticket.id,
        messageContent,
        true,
      );
    }

    if (isOutbound(postmarkPayload)) {
      const mailId = postmarkPayload.message_id;

      const message = await prisma.message.findFirst({
        where: { reference_id: mailId, type: MessageType.EMAIL },
        select: { id: true },
      });

      if (!message) {
        return new Response('Message not found!', { status: 200 });
      }

      const messageId = message.id;
      let eventType: EmailEventType;
      let extra: string = '';

      if (isOpenOutbound(postmarkPayload)) {
        eventType = EmailEventType.OPENED;
        extra = postmarkPayload.event_data.ip;
      }

      if (isDeliveryOutbound(postmarkPayload)) {
        eventType = EmailEventType.DELIVERED;
        extra = postmarkPayload.event_data.to[0];
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
