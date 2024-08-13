import { TeamSize, UserRole } from '@prisma/client';
import { prisma } from '@/prisma/prisma';
import { removeNullUndefined } from '@/helpers/common';

// Service to get workspace by ID
export const getWorkspaceById = async (workspaceId: string) => {
  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    include: {
      users: { include: { user: true } },
      invited_users: true,
      tickets: true,
      ticketLabels: true,
    },
  });
  if (!workspace) {
    return null;
  }

  const formattedWorkspace = {
    ...workspace,
    users: workspace.users.map((x) => x.user),
  };
  return formattedWorkspace;
};

// Service to create workspace
export const createWorkspace = async ({
  name,
  industry,
  teamSize,
}: {
  name: string;
  industry: string;
  teamSize: TeamSize;
}) => {
  const newWorkspace = await prisma.workspace.create({
    data: { name, industry, team_size: teamSize },
  });
  return newWorkspace;
};

// Service to invite users to a workspace
export const inviteUsers = async (
  users: { displayName: string; email: string }[],
  workspaceId: string,
  invitedBy: string,
) => {
  const filteredUsers = users.filter((user) => user.email !== invitedBy);
  const userEmails = filteredUsers.map((user) => user.email);

  // Add verified users to workspace
  const verifiedUsers = await prisma.user.findMany({
    where: { is_verified: true, email: { in: userEmails } },
  });
  const userWorkspaceToAdd = verifiedUsers.map((user) => ({
    user_id: user.id,
    workspace_id: workspaceId,
  }));

  await prisma.userWorkspaces.createMany({ data: userWorkspaceToAdd });

  const notVerifiedUsers = filteredUsers.filter(
    (user) => !verifiedUsers.some((x) => x.email === user.email),
  );

  const usersToInvite = notVerifiedUsers.map((user) => ({
    name: user.displayName,
    email: user.email,
    workspace_id: workspaceId,
    invited_by: invitedBy,
  }));
  const result = await prisma.invitedUser.createMany({ data: usersToInvite });

  // TODO: send invitation mail to each user

  return result;
};

export const addUserToWorkspace = async (
  workspaceId: string,
  userId: string,
  userRole?: UserRole,
) => {
  const userWorkspaceRelation = await prisma.userWorkspaces.create({
    data: {
      user_id: userId,
      workspace_id: workspaceId,
      role: userRole || UserRole.MEMBER,
    },
  });
  return userWorkspaceRelation;
};

export const removeUserFromWorkspace = async (
  workspaceId: string,
  userId: string,
) => {
  const res = await prisma.userWorkspaces.deleteMany({
    where: { workspace_id: workspaceId, user_id: userId },
  });
  return res;
};

export const updateUser = async ({
  workspaceId,
  userUpdates,
  userId,
}: {
  workspaceId: string;
  userId: string;
  userUpdates: { role?: UserRole };
}) => {
  removeNullUndefined(userUpdates);

  await prisma.userWorkspaces.updateMany({
    where: { workspace_id: workspaceId, user_id: userId },
    data: userUpdates,
  });

  const result = await prisma.userWorkspaces.findFirst({
    where: { workspace_id: workspaceId, user_id: userId },
  });

  return result;
};

export const getUserWorkspaces = async (userId: string) => {
  const workspaces = await prisma.userWorkspaces.findMany({
    where: { user_id: userId },
    include: { workspace: { include: { users: { include: { user: true } } } } },
  });
  const formattedWorkspaces = workspaces.map(({ workspace }) => ({
    ...workspace,
    users: workspace.users.map((x) => x.user),
  }));
  return formattedWorkspaces;
};

export const hasWorkspace = async (workspaceId: string) => {
  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
  });
  return !!workspace;
};
