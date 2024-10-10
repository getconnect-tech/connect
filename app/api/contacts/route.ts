import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { getWorkspaceContacts } from '@/services/serverSide/contact';

export const GET = withWorkspaceAuth(async (req) => {
  try {
    const contacts = await getWorkspaceContacts(req.workspace.id);

    return Response.json(contacts, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
