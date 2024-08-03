import { TeamSize } from "@prisma/client";
import { prisma } from "@/prisma/prisma";

// Service to create workspace
export const createWorkspace = async ({ name, industry, teamSize }: { name: string; industry: string; teamSize: TeamSize }) => {
  const newWorkspace = await prisma.workspace.create({ data: { name, industry, team_size: teamSize } });
  return newWorkspace;
};

// Service to invite users to a workspace
export const inviteUsers = async (users: { name: string; email: string }[], workspaceId: string, invitedBy: string) => {
  const filteredUsers = users.filter((user) => user.email !== invitedBy);
  const userEmails = filteredUsers.map((user) => user.email);

  // Add verified users to workspace
  const verifiedUsers = await prisma.user.findMany({ where: { is_verified: true, email: { in: userEmails } } });
  const userWorkspaceToAdd = verifiedUsers.map((user) => ({ user_id: user.id, workspace_id: workspaceId }));

  await prisma.userWorkspaces.createMany({ data: userWorkspaceToAdd });

  const notVerifiedUsers = filteredUsers.filter((user) => !verifiedUsers.some((x) => x.email === user.email));

  const usersToInvite = notVerifiedUsers.map((user) => ({ ...user, workspace_id: workspaceId, invited_by: invitedBy }));
  const result = await prisma.invitedUser.createMany({ data: usersToInvite });

  // TODO: send invitation mail to each user

  return result;
};
