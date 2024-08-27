/* eslint-disable indent */
import { Workspace, User } from '@prisma/client';
import { NextRequest } from 'next/server';
import { getApiDetails } from '@/services/serverSide/apiKey';

type AuthorizedRequest = NextRequest & { user: User; workspace: Workspace };
// eslint-disable-next-line no-unused-vars
type RequestHandler = (
  // eslint-disable-next-line no-unused-vars
  req: AuthorizedRequest,
  // eslint-disable-next-line no-unused-vars
  params: Record<string, string>,
) => Response | Promise<Response>;

export const withApiAuth =
  (handler: RequestHandler) =>
  async (req: NextRequest, { params }: { params: Record<string, string> }) => {
    const authorizationHeader = req.headers.get('Authorization');
    const authorizedRequest = req as AuthorizedRequest;

    if (!authorizationHeader) {
      return Response.json(
        {
          error:
            "Missing authorization header. Did you forget to add 'Authorization' header?",
        },
        { status: 400 },
      );
    }

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

    return handler(authorizedRequest, params);
  };
