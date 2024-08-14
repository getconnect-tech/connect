import { z } from 'zod';
import { displayNameSchema, profilePicSchema } from '@/lib/zod/user';
import withAuth from '@/middlewares/withAuth';
import { handleApiError } from '@/helpers/errorHandler';
import { getUserById, updateUser } from '@/services/serverSide/user';

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

const RequestBody = z.object({
  dispalyName: displayNameSchema.optional(),
  profilePic: profilePicSchema.optional(),
});

export const PUT = withAuth(async (req) => {
  try {
    const requestBody = await req.json();
    RequestBody.parse(requestBody);

    const updatedUser = await updateUser(req.user.id, requestBody);

    return Response.json(updatedUser, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
