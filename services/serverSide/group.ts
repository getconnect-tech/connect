import { removeNullUndefined } from '@/helpers/common';
import { prisma } from '@/prisma/prisma';

export const getWorkspaceGroups = async (workspaceId: string) => {
  const groups = await prisma.group.findMany({
    where: { workspace_id: workspaceId },
  });

  return groups;
};

export const createGroup = async (
  workspaceId: string,
  {
    name,
    groupLabel,
    customTraits,
  }: {
    name: string;
    groupLabel: string;
    customTraits?: Record<string, string>;
  },
) => {
  const newGroup = await prisma.group.create({
    data: {
      workspace_id: workspaceId,
      name,
      group_label: groupLabel,
      traits: customTraits,
    },
  });

  return newGroup;
};

export const updateGroup = async (
  groupId: string,
  groupData: {
    name?: string;
    groupLabel?: string;
    customTraits?: Record<string, string>;
  },
) => {
  removeNullUndefined(groupData);

  const updatedGroup = await prisma.group.update({
    where: { id: groupId },
    data: groupData,
  });

  return updatedGroup;
};

export const addContactsToGroup = async (
  groupId: string,
  contactIds: string[],
) => {
  if (contactIds.length <= 0) {
    return null;
  }

  const payload = contactIds.map((contactId) => ({
    contact_id: contactId,
    group_id: groupId,
  }));
  const relation = await prisma.contactGroup.createMany({
    data: payload,
  });

  return relation;
};

export const removeContactsFromGroup = async (
  groupId: string,
  contactIds: string[],
) => {
  if (contactIds.length <= 0) {
    return null;
  }

  const response = await prisma.contactGroup.deleteMany({
    where: { group_id: groupId, contact_id: { in: contactIds } },
  });

  return response;
};
