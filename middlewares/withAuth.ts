/* eslint-disable indent */
import { User } from '@prisma/client';
import { NextRequest } from 'next/server';
import { getSessionDetails } from '@/services/serverSide/auth/authentication';
import { getApiDetails } from '@/services/serverSide/apiKey';

type AuthorizedRequest = NextRequest & { user: User };
type RequestHandler = (
  // eslint-disable-next-line no-unused-vars
  req: AuthorizedRequest,
  // eslint-disable-next-line no-unused-vars
  params: Record<string, string>,
) => Response | Promise<Response>;

const withAuth =
  (handler: RequestHandler) =>
  async (req: NextRequest, { params }: { params: Record<string, string> }) => {
    const authorizedRequest = req as AuthorizedRequest;
    const authorizationHeader = req.nextUrl.searchParams.get('API_KEY');

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
    } else {
      const session = await getSessionDetails();

      if (!session?.user.id) {
        return Response.json({ error: 'Unauthorized!' }, { status: 401 });
      }

      authorizedRequest.user = session.user;
    }

    return handler(authorizedRequest, params);
  };

export default withAuth;
