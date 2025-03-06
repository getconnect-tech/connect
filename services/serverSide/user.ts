import { removeNullUndefined } from '@/helpers/common';
import { prisma } from '@/prisma/prisma';

export const updateUser = async (
  userId: string,
  userUpdates: { displayName?: string; profilePic?: string },
) => {
  const update = {
    display_name: userUpdates.displayName,
    profile_url: userUpdates.profilePic,
  };
  removeNullUndefined(update);
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: update,
  });

  return updatedUser;
};

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user;
};
