import { handleApiError } from '@/helpers/errorHandler';
import { reactionSchema } from '@/lib/zod/message';
import withWorkspaceAuth from '@/middlewares/withWorkspaceAuth';
import { reactMessage } from '@/services/serverSide/message';
import { NotificationProvider } from '@/services/serverSide/notifications';

export const POST = withWorkspaceAuth(async (req, { messageId }) => {
  try {
    const { reaction } = await req.json();

    reactionSchema.parse(reaction);

    const userId = req.user.id;

    const newReaction = await reactMessage(messageId, userId, reaction);

    if (newReaction.status === 'created' || newReaction.status === 'updated') {
      NotificationProvider.sendMessageReactionNotification(
        userId,
        messageId,
        newReaction.reaction,
      );
    }

    return Response.json(newReaction, {
      status: newReaction.status === 'created' ? 201 : 200,
    });
  } catch (err) {
    return handleApiError(err);
  }
});
