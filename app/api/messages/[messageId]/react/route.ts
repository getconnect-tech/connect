import { handleApiError } from '@/helpers/errorHandler';
import { reactionSchema } from '@/lib/zod/message';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { reactMessage } from '@/services/serverSide/message';

export const POST = withWorkspaceAuth(async (req, { messageId }) => {
  try {
    const { reaction } = await req.json();

    reactionSchema.parse(reaction);

    const newReaction = await reactMessage(messageId, req.user.id, reaction);

    return Response.json(newReaction, { status: 200 });
  } catch (err) {
    return handleApiError(err);
  }
});
