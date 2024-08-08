import { NextRequest } from 'next/server';
import { MessageType } from '@prisma/client';
import { InboundEmailPayload } from '@/utils/dataTypes';
import { handleApiError } from '@/helpers/errorHandler';
import { createTicket, getTicketByMailId } from '@/services/serverSide/ticket';
import { postMessage } from '@/services/serverSide/message';

export const POST = async (req: NextRequest) => {
  try {
    const emailPayload = (await req.json()) as InboundEmailPayload;
    const referencesHeader = emailPayload.Headers.find(
      (header) => header.Name === 'References',
    );
    const references = referencesHeader?.Value?.split(' ') || [];
    const mailId = emailPayload.Headers.find(
      (header) => header.Name === 'Message-ID',
    )!.Value;
    const referenceId = references[0] || mailId;

    let ticket = await getTicketByMailId(referenceId);
    if (!ticket) {
      ticket = await createTicket({
        mailId: referenceId,
        subject: emailPayload.Subject,
        // eslint-disable-next-line max-len
        workspaceId: '3e4b0b59-00af-4683-8158-b139925d38ff', // TODO: Replace with workspace id where we want to want forward the tickets
        senderEmail: emailPayload.From,
        senderName: emailPayload.FromName,
      });
    }

    await postMessage({
      messageContent: emailPayload.HtmlBody,
      messageType: MessageType.EMAIL,
      referenceId,
      ticketId: ticket.id,
    });

    return new Response('Received!', { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
};
