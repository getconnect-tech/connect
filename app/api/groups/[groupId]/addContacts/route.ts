import { handleApiError } from '@/helpers/errorHandler';
import withAdminAuth from '@/middlewares/withAdminAuth';
import { contactIdsSchema } from '@/lib/zod/contact';
import { addContactsToGroup } from '@/services/serverSide/group';

export const POST = withAdminAuth(async (req, { groupId }) => {
  try {
    const requestBody = await req.json();
    contactIdsSchema.parse(requestBody);

    await addContactsToGroup(groupId, requestBody);

    return new Response('Contacts Added!', { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
