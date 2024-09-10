import { sendInvitationEmail } from '@/helpers/emails';
import { handleApiError } from '@/helpers/errorHandler';
import withAdminAuth from '@/middlewares/withAdminAuth';
import { prisma } from '@/prisma/prisma';

export const POST = withAdminAuth(async (req, { userId }) => {
  try {
    const data = await prisma.invitedUser.findUnique({
      where: { id: userId },
      select: {
        email: true,
        workspace: {
          select: { name: true },
        },
      },
    });

    if (!data) {
      return Response.json(
        { error: 'Invited user not found!' },
        { status: 404 },
      );
    }

    const { email, workspace } = data;

    await sendInvitationEmail(email, workspace.name);

    return Response.json(
      { message: 'Invitation email sent!' },
      { status: 200 },
    );
  } catch (err) {
    return handleApiError(err);
  }
});
