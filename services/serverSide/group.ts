import { TicketStatus } from '@prisma/client';
import { removeNullUndefined } from '@/helpers/common';
import { prisma } from '@/prisma/prisma';

export const getWorkspaceGroups = async (workspaceId: string) => {
  const groups = await prisma.group.findMany({
    where: { workspace_id: workspaceId },
    include: {
      _count: {
        select: {
          contacts: true,
        },
      },
      contacts: {
        select: {
          contact: {
            select: {
              tickets: {
                select: {
                  status: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const formattedGroups = groups.map(({ _count, contacts, ...group }) => {
    const ticketsCount = {} as Record<TicketStatus, number>;

    for (const status of Object.values(TicketStatus)) {
      ticketsCount[status] = 0;
    }

    // Count the status of tickets for each contact
    contacts.forEach(({ contact }) => {
      contact.tickets.forEach(({ status }) => ticketsCount[status]++);
    });

    return {
      ...group,
      contacts_count: _count.contacts,
      ticketsCount,
    };
  });

  return formattedGroups;
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
