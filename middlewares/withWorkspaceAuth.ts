/* eslint-disable indent */
import { User, Workspace } from '@prisma/client';
import { NextRequest } from 'next/server';
import { isEmpty } from '@/helpers/common';
import { getSessionDetails } from '@/services/serverSide/auth/authentication';
import { prisma } from '@/prisma/prisma';
import { getApiDetails } from '@/services/serverSide/apiKey';

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
    const authorizationHeader = req.nextUrl.searchParams.get('API_KEY');
    const authorizedRequest = req as AuthorizedRequest;

    if (authorizationHeader) {
      if (!authorizationHeader.startsWith('Bearer ')) {
        return Response.json(
          {
            error:
              "Misconfigured authorization header. Did you forget to add 'Bearer '?",
          },
          { status: 400 },
        );
      }

      const apiKey = authorizationHeader.slice(7);

      const apiKeyDetails = await getApiDetails(apiKey);

      if (!apiKeyDetails) {
        return Response.json(
          { error: 'Unauthorized: Invalid API key!' },
          { status: 401 },
        );
      }

      authorizedRequest.user = apiKeyDetails.user;
      authorizedRequest.workspace = apiKeyDetails.workspace;
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
        include: { users: { select: { user_id: true } } },
      });

      if (!workspace) {
        return Response.json({ error: 'Invalid workspace_id!' });
      }

      if (!workspace.users.some((user) => user.user_id === session.user.id)) {
        return Response.json({ error: 'Unauthorized!' }, { status: 401 });
      }

      authorizedRequest.user = session.user;
      authorizedRequest.workspace = workspace;
    }

    return handler(authorizedRequest, params);
  };

export default withWorkspaceAuth;
