import errorMessages from "@/global/errorMessages";
import { isEmpty } from "@/helpers/common";
import { handleApiError } from "@/helpers/errorHandler";
import withAuth from "@/middlewares/withAuth";
import { addUserToWorkspace, createWorkspace } from "@/services/serverSide/workspace";

export const POST = withAuth(async (req) => {
  try {
    const user = req.user;
    const { name, teamSize, industry, invitedUsers } = await req.json();

    if (isEmpty(name)) {
      return Response.json({ error: errorMessages.NAME_IS_REQUIRED }, { status: 400 });
    }

    if (isEmpty(teamSize)) {
      return Response.json({ error: errorMessages.TEAM_SIZE_IS_REQUIRED }, { status: 400 });
    }

    if (isEmpty(industry)) {
      return Response.json({ error: errorMessages.INDUSTRY_IS_REQUIRED }, { status: 400 });
    }

    const newWorkspace = await createWorkspace({ name, industry, teamSize });
    await addUserToWorkspace(newWorkspace.id, user.id);

    return Response.json(newWorkspace, { status: 201 });
  } catch (err) {
    return handleApiError(err);
  }
});
