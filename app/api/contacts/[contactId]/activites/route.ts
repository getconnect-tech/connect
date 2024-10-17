import { getActivities, getContactById } from '@/services/serverSide/contact';
import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';

export const GET = withWorkspaceAuth(async (req, { contactId }) => {
  try {
    const contact = await getContactById(contactId);

    if (!contact) {
      return Response.json({ error: 'Contact not found!' }, { status: 404 });
    }

    const events = await getActivities(contact.email);

    return Response.json(events || [], { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
