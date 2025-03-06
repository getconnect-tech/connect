import { z } from 'zod';
import { ChannelType, MessageType } from '@prisma/client';
import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import {
  createTicket,
  generateTicketTitle,
  getWorkspaceTickets,
} from '@/services/serverSide/ticket';
import { withApiAuth } from '@/middlewares/withApiAuth';
import { postMessage } from '@/services/serverSide/message';
import { uploadAttachments } from '@/services/serverSide/firebaseServices';
import { downloadFileAsBase64 } from '@/helpers/common';
import { createStringSchema, parseAndValidateRequest } from '@/lib/zod';

const lastUpdatedTimeSchema = createStringSchema('last_updated', {
  datetime: true,
}).optional();
export const GET = withWorkspaceAuth(async (req) => {
  try {
    const workspaceId = req.workspace.id;
    const searchParams = req.nextUrl.searchParams;
    const lastUpdated = searchParams.get('last_updated') ?? undefined;

    lastUpdatedTimeSchema.parse(lastUpdated);

    const tickets = await getWorkspaceTickets(
      workspaceId,
      req.user.id,
      lastUpdated,
    );

    return Response.json(tickets, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});

const CreateRequestBody = z.object({
  senderName: createStringSchema('senderName').optional(),
  senderEmail: createStringSchema('senderEmail', { email: true }),
  subject: createStringSchema('subject').optional(),
  message: createStringSchema('message'),
  attachments: z
    .array(
      z.object({
        filename: createStringSchema('filename'),
        url: createStringSchema('url', { url: true }),
      }),
    )
    .optional(),
});
export const POST = withApiAuth(async (req) => {
  try {
    const { subject, message, senderEmail, attachments, senderName } =
      await parseAndValidateRequest(req, CreateRequestBody);
    const workspaceId = req.workspace.id;

    const ticketTitle = subject ?? (await generateTicketTitle(message));

    const newTicket = await createTicket({
      workspaceId,
      source: ChannelType.WEB,
      senderName: senderName,
      senderEmail: senderEmail,
      subject: ticketTitle,
    });

    const newMessage = await postMessage({
      messageContent: message,
      messageType: MessageType.FROM_CONTACT,
      ticketId: newTicket.id,
      referenceId: '',
      channel: ChannelType.WEB,
    });

    if (attachments && attachments.length > 0) {
      const attachmentsToUpload = await Promise.all(
        attachments.map(async (attachment) => {
          const { content, contentType } = await downloadFileAsBase64(
            attachment.url,
          );

          return {
            Name: attachment.filename,
            ContentID: null,
            Content: content,
            ContentType: contentType,
          };
        }),
      );

      await uploadAttachments(
        workspaceId,
        newTicket.id,
        newMessage.id,
        attachmentsToUpload,
      );
    }

    return Response.json(newTicket, { status: 201 });
  } catch (err) {
    return handleApiError(err);
  }
});
