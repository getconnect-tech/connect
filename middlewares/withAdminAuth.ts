/* eslint-disable indent */
import { User, UserRole, Workspace } from '@prisma/client';
import { NextRequest } from 'next/server';
import { withApiAuth } from './withApiAuth';
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

const withAdminAuth =
  (handler: RequestHandler) =>
  async (req: NextRequest, { params }: { params: Record<string, string> }) => {
    const authorizationHeader = req.headers.get('Authorization');
    const authorizedRequest = req as AuthorizedRequest;

    if (authorizationHeader) {
      return withApiAuth(handler);
    } else {
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
        include: { users: { select: { user_id: true, role: true } } },
      });

      if (!workspace) {
        return Response.json({ error: 'Invalid workspace_id!' });
      }

      const user = workspace.users.find(
        (user) => user.user_id === session.user.id,
      );

      if (
        !user ||
        (user.role !== UserRole.ADMIN && user.role !== UserRole.OWNER)
      ) {
        return Response.json({ error: 'Unauthorized!' }, { status: 401 });
      }

      authorizedRequest.user = session.user;
      authorizedRequest.workspace = workspace;
    }

    return handler(authorizedRequest, params);
  };

export default withAdminAuth;
