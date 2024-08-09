import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { addLabel, removeLabel } from '@/services/serverSide/ticket';

export const POST = withWorkspaceAuth(async (req, { ticketId, labelId }) => {
  try {
    await addLabel(ticketId, labelId);

    return Response.json({ message: 'Label added!' }, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});

export const DELETE = withWorkspaceAuth(async (req, { ticketId, labelId }) => {
  try {
    await removeLabel(ticketId, labelId);

    return Response.json({ message: 'Label removed!' }, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
