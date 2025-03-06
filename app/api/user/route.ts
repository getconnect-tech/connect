import { z } from 'zod';
import withAuth from '@/middlewares/withAuth';
import { handleApiError } from '@/helpers/errorHandler';
import { getUserById, updateUser } from '@/services/serverSide/user';
import { createStringSchema, parseAndValidateRequest } from '@/lib/zod';

export const GET = withAuth(async (req) => {
  try {
    const user = await getUserById(req.user.id);

    if (!user) {
      return Response.json({ error: 'Not Found!' }, { status: 404 });
    }

    return Response.json(user, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});

const UpdateRequestBody = z.object({
  displayName: createStringSchema('displayName', {
    regex: /^[a-zA-Z ]{2,30}$/,
  }).optional(),
  profilePic: createStringSchema('profilePic', { url: true }).optional(),
});
export const PUT = withAuth(async (req) => {
  try {
    const requestBody = await parseAndValidateRequest(req, UpdateRequestBody);

    const updatedUser = await updateUser(req.user.id, requestBody);

    return Response.json(updatedUser, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
