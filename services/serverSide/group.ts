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

export const addContactToGroup = async (contactId: string, groupId: string) => {
  const relation = await prisma.contactGroup.create({
    data: { contact_id: contactId, group_id: groupId },
  });

  return relation;
};

export const removeContactFromGroup = async (
  contactId: string,
  groupId: string,
) => {
  const removedRelation = await prisma.contactGroup.delete({
    where: { contact_group_id: { contact_id: contactId, group_id: groupId } },
  });

  return removedRelation;
};
