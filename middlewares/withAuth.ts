import { User } from '@prisma/client';
import { NextRequest } from 'next/server';
import { getSessionDetails } from '@/services/serverSide/auth/authentication';

type AuthorizedRequest = NextRequest & { user: User };
type RequestHandler = (req: AuthorizedRequest) => Response | Promise<Response>;

const withAuth = (handler: RequestHandler) => async (req: NextRequest) => {
  const session = await getSessionDetails();

  if (!session?.user.id) {
    return Response.json({ error: 'Unauthorized!' }, { status: 401 });
  }

  const authorizedRequest = req as AuthorizedRequest;
  authorizedRequest.user = session.user;

  return handler(authorizedRequest);
};

export default withAuth;
