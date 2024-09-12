import { handleApiError } from '@/helpers/errorHandler';
import { lastUpdatedTimeSchema } from '@/lib/zod/common';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { getWorkspaceTickets } from '@/services/serverSide/ticket';

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
