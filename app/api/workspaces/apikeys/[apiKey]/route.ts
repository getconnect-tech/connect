import { handleApiError } from '@/helpers/errorHandler';
import withAdminAuth from '@/middlewares/withAdminAuth';
import { deleteApiKey } from '@/services/serverSide/apiKey';

export const DELETE = withAdminAuth(async (req, { apiKey }) => {
  try {
    const deletedApiKey = await deleteApiKey(apiKey);

    return Response.json(deletedApiKey, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
