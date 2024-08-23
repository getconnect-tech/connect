import { TeamSize, UserRole } from '@prisma/client';
import { prisma } from '@/prisma/prisma';
import { removeNullUndefined } from '@/helpers/common';

// Service to get workspace by ID
export const getWorkspaceById = async (
  workspaceId: string,
  currentUserId: string,
) => {
  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId, users: { some: { user_id: currentUserId } } },
    include: {
      users: { include: { user: true }, orderBy: { created_at: 'asc' } },
      invited_users: true,
      tickets: true,
      ticketLabels: true,
    },
  });

  if (!workspace) {
    return null;
  }

  const currentRole = workspace.users.find(
    (x) => x.user_id === currentUserId,
  )!.role;

  const formattedWorkspace = {
    ...workspace,
    users: workspace.users.map((x) => ({
      ...x.user,
      role: x.role,
    })),
    role: currentRole,
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
  const res = await prisma.userWorkspaces.delete({
    where: {
      user_workspace_id: { user_id: userId, workspace_id: workspaceId },
    },
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

  const updatedRelation = await prisma.userWorkspaces.update({
    where: {
      user_workspace_id: { workspace_id: workspaceId, user_id: userId },
    },
    data: userUpdates,
  });

  return updatedRelation;
};

export const getUserWorkspaces = async (userId: string) => {
  const workspaces = await prisma.userWorkspaces.findMany({
    where: { user_id: userId },
    include: {
      workspace: true,
    },
  });

  const formattedWorkspaces = workspaces.map(({ workspace }) => ({
    ...workspace,
  }));

  return formattedWorkspaces;
};

export const hasWorkspace = async (workspaceId: string) => {
  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
  });
  return !!workspace;
};

export const updateWorkspace = async (
  workspaceId: string,
  workspaceUpdates: {
    name?: string;
    imageUrl?: string;
  },
) => {
  const update = {
    name: workspaceUpdates.name,
    image_url: workspaceUpdates.imageUrl,
  };

  removeNullUndefined(update);

  const updatedWorkspace = await prisma.workspace.update({
    where: { id: workspaceId },
    data: update,
  });

  return updatedWorkspace;
};

export const removeInvitedUser = async (invitedUserId: string) => {
  const deletedInvitedUser = await prisma.invitedUser.delete({
    where: { id: invitedUserId },
  });

  return deletedInvitedUser;
};

export const getUserRole = async (workspaceId: string, userId: string) => {
  const userWorkspaceRel = await prisma.userWorkspaces.findUnique({
    where: {
      user_workspace_id: { user_id: userId, workspace_id: workspaceId },
    },
  });

  if (!userWorkspaceRel) {
    return null;
  }

  return userWorkspaceRel.role;
};
