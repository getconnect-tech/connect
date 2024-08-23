import { handleApiError } from '@/helpers/errorHandler';
import { lastUpdatedTimeSchema } from '@/lib/zod/common';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { getWorkspaceTickets } from '@/services/serverSide/ticket';

export const GET = withWorkspaceAuth(async (req) => {
  try {
    const workspaceId = req.workspace.id;
    const lastUpdated = req.headers.get('last_updated') as string;

    lastUpdatedTimeSchema.optional().parse(lastUpdated);

    const tickets = await getWorkspaceTickets(workspaceId, lastUpdated);

    return Response.json(tickets, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
