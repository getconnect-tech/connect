import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { prisma } from '@/prisma/prisma';

export const GET = withWorkspaceAuth(async (req, { ticketId }) => {
  try {
    const messages = await prisma.message.findMany({
      where: { ticket_id: ticketId },
    });

    return Response.json(messages, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
