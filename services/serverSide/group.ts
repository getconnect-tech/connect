import { TicketStatus } from '@prisma/client';
import { removeNullUndefined } from '@/helpers/common';
import { prisma } from '@/prisma/prisma';
import { getWorkspaceTickets } from './ticket';

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
                where: { workspace_id: workspaceId },
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
    avatar,
    customTraits,
    externalId,
  }: {
    name: string;
    groupLabel: string;
    customTraits?: Record<string, string>;
    avatar?: string;
    externalId?: string;
  },
) => {
  if (externalId) {
    const newGroup = await prisma.group.upsert({
      where: {
        external_group_id: {
          workspace_id: workspaceId,
          group_id: externalId,
        },
      },
      create: {
        name,
        avatar,
        traits: customTraits,
        group_label: groupLabel,
        group_id: externalId,
        workspace_id: workspaceId,
      },
      update: {
        name,
        avatar,
        traits: customTraits,
        group_label: groupLabel,
      },
    });

    return newGroup;
  }

  const newGroup = await prisma.group.create({
    data: {
      name,
      avatar,
      group_label: groupLabel,
      traits: customTraits,
      workspace_id: workspaceId,
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
    avatar?: string;
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
    skipDuplicates: true,
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

export const getGroupById = async (
  groupId: string,
  userId: string,
  lastUpdated?: string,
) => {
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: {
      contacts: {
        select: {
          contact_id: true,
          contact: {
            select: {
              name: true,
              email: true,
              phone: true,
              avatar: true,
            },
          },
        },
      },
    },
  });

  if (!group) {
    throw new Error('Group not found');
  }

  const contactIds = group.contacts.map((c) => c.contact_id);

  const tickets = await getWorkspaceTickets(
    group.workspace_id,
    userId,
    lastUpdated,
    contactIds,
  );

  return {
    ...group,
    contacts: group.contacts.map((c) => c.contact),
    tickets,
  };
};
