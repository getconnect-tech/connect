import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import { createStringSchema, parseAndValidateRequest } from '@/lib/zod';
import withAdminAuth from '@/middlewares/withAdminAuth';
import { addContactsToGroup } from '@/services/serverSide/group';

const CreateRequestBody = z.array(createStringSchema('contactId'));
export const POST = withAdminAuth(async (req, { groupId }) => {
  try {
    const requestBody = await parseAndValidateRequest(req, CreateRequestBody);

    await addContactsToGroup(groupId, requestBody);

    return new Response('Contacts Added!', { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
