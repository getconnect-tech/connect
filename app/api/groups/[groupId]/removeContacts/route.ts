import { handleApiError } from '@/helpers/errorHandler';
import withAdminAuth from '@/middlewares/withAdminAuth';
import { contactIdsSchema } from '@/lib/zod/contact';
import { removeContactsFromGroup } from '@/services/serverSide/group';

export const POST = withAdminAuth(async (req, { groupId }) => {
  try {
    const requestBody = await req.json();
    contactIdsSchema.parse(requestBody);

    await removeContactsFromGroup(groupId, requestBody);

    return new Response('Contacts Removed!', { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
