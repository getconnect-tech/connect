import { generateApiKey } from '@/helpers/common';
import { prisma } from '@/prisma/prisma';

export const getWorkspaceApiKeys = async (workspaceId: string) => {
  const apiKeys = await prisma.apiKeys.findMany({
    where: { workspace_id: workspaceId },
  });

  return apiKeys;
};

export const createApiKey = async ({
  userId,
  workspaceId,
  name,
}: {
  userId: string;
  workspaceId: string;
  name: string;
}) => {
  const api_key = generateApiKey();

  const apiKey = await prisma.apiKeys.create({
    data: { api_key, created_by: userId, workspace_id: workspaceId, name },
  });

  return apiKey;
};

export const getApiDetails = async (apiKey: string) => {
  const apiDetails = await prisma.apiKeys.findUnique({
    where: { api_key: apiKey },
    include: { user: true, workspace: true },
  });

  return apiDetails;
};

export const deleteApiKey = async (apiKey: string) => {
  const deletedKey = await prisma.apiKeys.delete({
    where: { api_key: apiKey },
  });

  return deletedKey;
};
