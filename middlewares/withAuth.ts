/* eslint-disable indent */
import { User } from '@prisma/client';
import { NextRequest } from 'next/server';
import { withApiAuth } from './withApiAuth';
import { getSessionDetails } from '@/services/serverSide/auth/authentication';

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
    const authorizationHeader = req.headers.get('Authorization');

    if (authorizationHeader) {
      return withApiAuth(handler)(req, { params });
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
