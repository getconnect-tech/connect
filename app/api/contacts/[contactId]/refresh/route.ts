import axios from 'axios';
import { handleApiError } from '@/helpers/errorHandler';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { getWorkspaceConfig } from '@/services/serverSide/workspace';
import { getContactById } from '@/services/serverSide/contact';

export const GET = withWorkspaceAuth(async (req, { contactId }) => {
  try {
    const workspaceConfig = await getWorkspaceConfig(req.workspace.id);

    if (!workspaceConfig?.webhooks?.contactRefresh) {
      return Response.json(
        {
          error:
            // eslint-disable-next-line max-len
            'Contact refresh configuration not found. Please setup a contact refresh webhook under the workspace settings.',
        },
        { status: 404 },
      );
    }

    const contactDetails = await getContactById(contactId);

    if (!contactDetails) {
      return Response.json({ error: 'Contact not found!' }, { status: 404 });
    }

    const { id, contact_id, email } = contactDetails;

    const webhookUrl =
      workspaceConfig.webhooks.contactRefresh +
      `?contactId=${encodeURIComponent(id)}&contactEmail=${encodeURIComponent(email)}` +
      (contact_id ? `&externalId=${encodeURIComponent(contact_id)}` : '');

    const { data, status } = await axios.get(webhookUrl);

    if (status === 200) {
      const updatedContact = await getContactById(contactId);
      return Response.json(updatedContact, { status: 200 });
    }

    return new Response(`Error refreshing contact: ` + JSON.stringify(data), {
      status,
    });
  } catch (err) {
    return handleApiError(err);
  }
});
