import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { getContactGroups } from '@/services/serverSide/contact';

export const GET = withWorkspaceAuth(async (req, { contactId }) => {
  try {
    const groups = await getContactGroups(contactId);

    return Response.json(groups, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
