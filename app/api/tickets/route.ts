import { z } from 'zod';
import { ChannelType, MessageType } from '@prisma/client';
import { handleApiError } from '@/helpers/errorHandler';
import { lastUpdatedTimeSchema } from '@/lib/zod/common';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import {
  createTicket,
  generateTicketTitle,
  getWorkspaceTickets,
} from '@/services/serverSide/ticket';
import { withApiAuth } from '@/middlewares/withApiAuth';
import {
  messageSchema,
  senderEmailSchema,
  senderNameSchema,
  subjectSchema,
} from '@/lib/zod/ticket';
import { postMessage } from '@/services/serverSide/message';
import { attachmentSchema } from '@/lib/zod/message';
import { uploadAttachments } from '@/services/serverSide/firebaseServices';
import { downloadFileAsBase64 } from '@/helpers/common';

export const GET = withWorkspaceAuth(async (req) => {
  try {
    const workspaceId = req.workspace.id;
    const searchParams = req.nextUrl.searchParams;
    const lastUpdated = searchParams.get('last_updated') ?? undefined;

    lastUpdatedTimeSchema.optional().parse(lastUpdated);

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

const createRequestBody = z.object({
  senderName: senderNameSchema.optional(),
  senderEmail: senderEmailSchema,
  subject: subjectSchema.optional(),
  message: messageSchema,
  attachments: z.array(attachmentSchema).optional(),
});
export const POST = withApiAuth(async (req) => {
  try {
    const requestBody = await req.json();

    createRequestBody.parse(requestBody);

    const { senderEmail, senderName, message, subject, attachments } =
      requestBody as z.infer<typeof createRequestBody>;
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
