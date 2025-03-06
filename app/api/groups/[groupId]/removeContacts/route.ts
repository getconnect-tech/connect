import { z } from 'zod';
import { handleApiError } from '@/helpers/errorHandler';
import { createStringSchema, parseAndValidateRequest } from '@/lib/zod';
import withAdminAuth from '@/middlewares/withAdminAuth';
import { removeContactsFromGroup } from '@/services/serverSide/group';

const UpdateRequestBody = z.array(createStringSchema('contactIds'));
export const POST = withAdminAuth(async (req, { groupId }) => {
  try {
    const requestBody = await parseAndValidateRequest(req, UpdateRequestBody);

    await removeContactsFromGroup(groupId, requestBody);

    return new Response('Contacts Removed!', { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
