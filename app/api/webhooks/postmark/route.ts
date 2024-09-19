import { NextRequest } from 'next/server';
import { EmailEventType, MessageType, TicketStatus } from '@prisma/client';
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
  isSpamComplaintOutbound,
  PostmarkWebhookPayload,
} from '@/utils/webhookPayloadType';
import { prisma } from '@/prisma/prisma';
import { uploadAttachments } from '@/services/serverSide/firebaseServices';

export const POST = async (req: NextRequest) => {
  try {
    const postmarkPayload = (await req.json()) as PostmarkWebhookPayload;

    if (isInbound(postmarkPayload)) {
      const referencesHeader = postmarkPayload.Headers.find(
        (header) => header.Name === 'References',
      );
      const references = referencesHeader?.Value?.split(' ') || [];
      const mailId = postmarkPayload.Headers.find(
        (header) => header.Name === 'Message-ID',
      )!.Value;
      const referenceId = references[0] || mailId;

      const workspaceId = postmarkPayload.OriginalRecipient.split('@')[0]!;

      const isWorkspaceExists = await hasWorkspace(workspaceId);

      if (!isWorkspaceExists) {
        return new Response('Workspace not found!', { status: 200 });
      }

      let ticket = await getTicketByMailId(referenceId);
      if (!ticket) {
        ticket = await createTicket({
          mailId: referenceId,
          subject: postmarkPayload.Subject,
          workspaceId: workspaceId,
          senderEmail: postmarkPayload.From,
          senderName: postmarkPayload.FromName,
        });
      }

      if (ticket.status === TicketStatus.CLOSED) {
        await prisma.ticket.update({
          where: { id: ticket.id },
          data: { status: TicketStatus.OPEN },
        });
      }

      const message = await postMessage({
        messageContent: postmarkPayload.HtmlBody,
        messageType: MessageType.FROM_CONTACT,
        referenceId: mailId,
        ticketId: ticket.id,
      });

      if (postmarkPayload.Attachments.length > 0) {
        await uploadAttachments(
          workspaceId,
          ticket.id,
          message.id,
          postmarkPayload.Attachments,
        );
      }
    }

    if (isOutbound(postmarkPayload)) {
      const mailId = postmarkPayload.MessageID;

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
        extra = postmarkPayload.Recipient;
      }

      if (isDeliveryOutbound(postmarkPayload)) {
        eventType = EmailEventType.DELIVERED;
        extra = postmarkPayload.Recipient;
      }

      if (isSpamComplaintOutbound(postmarkPayload)) {
        eventType = EmailEventType.SPAMED;
        extra = postmarkPayload.Tag;
      }

      if (isBounceOutbound(postmarkPayload)) {
        eventType = EmailEventType.BOUNCED;
        extra = postmarkPayload.Description;
      }

      if (isLinkClickOutbound(postmarkPayload)) {
        eventType = EmailEventType.LINK_CLICKED;
        extra = postmarkPayload.OriginalLink;
      }

      await createEmailEvent(messageId, { eventType: eventType!, extra });
    }

    return new Response('Received!', { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
};
