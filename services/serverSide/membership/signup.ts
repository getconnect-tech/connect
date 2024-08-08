import { prisma } from '@/prisma/prisma';

// Service to check if user already signed-up or not
export const isUserAlreadyExists = async (
  userEmail: string,
  checkVerified = true,
) => {
  if (checkVerified) {
    const user = await prisma.user.findUnique({
      where: { email: userEmail, is_verified: true },
      select: { id: true },
    });
    return !!user;
  } else {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { id: true },
    });
    return !!user;
  }
};

// Service to create new user on database
export const createUser = async (
  {
    email,
    profilePic,
    displayName,
  }: { email: string; profilePic?: string; displayName?: string },
  asVerified = false,
) => {
  const newUser = await prisma.user.upsert({
    where: { email },
    create: {
      email,
      is_verified: asVerified,
      display_name: displayName,
      profile_url: profilePic,
    },
    update: {
      is_verified: asVerified,
      display_name: displayName,
      profile_url: profilePic,
    },
  });
  return newUser;
};

// Service to mark user as verified if account exists
export const markUserAsVerified = async (userEmail: string) => {
  const updatedUser = await prisma.user.update({
    where: { email: userEmail },
    data: { is_verified: true },
  });
  return updatedUser;
};

export const addToInvitedWorkspaces = async (
  userId: string,
  userEmail: string,
) => {
  const invitedWorkspaces = await prisma.invitedUser.findMany({
    where: { email: userEmail },
  });
  if (invitedWorkspaces.length > 0) {
    const relationsToAdd = invitedWorkspaces.map((x) => ({
      user_id: userId,
      workspace_id: x.workspace_id,
    }));
    await prisma.userWorkspaces.createMany({ data: relationsToAdd });
    await prisma.invitedUser.deleteMany({ where: { email: userEmail } });
  }
  return true;
};
