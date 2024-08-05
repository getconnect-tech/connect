import { handleApiError } from "@/helpers/errorHandler";
import { industrySchema, invitedUsersSchema, nameSchema, teamSizeSchema } from "@/lib/zod";
import withAuth from "@/middlewares/withAuth";
import { addUserToWorkspace, createWorkspace, inviteUsers } from "@/services/serverSide/workspace";
import { z } from "zod";

const RequestBody = z.object({
  name: nameSchema,
  teamSize: teamSizeSchema,
  industry: industrySchema,
  invitedUsers: invitedUsersSchema.optional(),
});

export const POST = withAuth(async (req) => {
  try {
    const requestBody = await req.json();

    RequestBody.parse(requestBody);

    const { name, teamSize, industry, invitedUsers } = requestBody as z.infer<typeof RequestBody>;
    const user = req.user;

    const newWorkspace = await createWorkspace({ name, industry, teamSize });
    await addUserToWorkspace(newWorkspace.id, user.id);
    if (invitedUsers) {
      await inviteUsers(invitedUsers, newWorkspace.id, user.id);
    }

    return Response.json(newWorkspace, { status: 201 });
  } catch (err) {
    return handleApiError(err);
  }
});
