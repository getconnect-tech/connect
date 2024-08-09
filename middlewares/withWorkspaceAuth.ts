/* eslint-disable indent */
import { User, Workspace } from '@prisma/client';
import { NextRequest } from 'next/server';
import { isEmpty } from '@/helpers/common';
import { getSessionDetails } from '@/services/serverSide/auth/authentication';
import { prisma } from '@/prisma/prisma';

type AuthorizedRequest = NextRequest & { user: User; workspace: Workspace };
// eslint-disable-next-line no-unused-vars
type RequestHandler = (
  // eslint-disable-next-line no-unused-vars
  req: AuthorizedRequest,
  // eslint-disable-next-line no-unused-vars
  params: Record<string, string>,
) => Response | Promise<Response>;

const withWorkspaceAuth =
  (handler: RequestHandler) =>
  async (req: NextRequest, { params }: { params: Record<string, string> }) => {
    const session = await getSessionDetails();

    if (!session?.user.id) {
      return Response.json({ error: 'Unauthorized!' }, { status: 401 });
    }

    const workspaceId = req.headers.get('workspace_id');

    if (isEmpty(workspaceId)) {
      return Response.json(
        { error: "Please provide 'workspace_id' in headers!" },
        { status: 400 },
      );
    }

    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId! },
      include: { users: { select: { user_id: true } } },
    });

    if (!workspace) {
      return Response.json({ error: 'Invalid workspace_id!' });
    }

    if (!workspace.users.some((user) => user.user_id === session.user.id)) {
      return Response.json({ error: 'Unauthorized!' }, { status: 401 });
    }

    const authorizedRequest = req as AuthorizedRequest;
    authorizedRequest.user = session.user;
    authorizedRequest.workspace = workspace;

    return handler(authorizedRequest, params);
  };

export default withWorkspaceAuth;
