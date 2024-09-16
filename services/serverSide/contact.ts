import { TicketStatus } from '@prisma/client';
import { removeNullUndefined } from '@/helpers/common';
import { prisma } from '@/prisma/prisma';

export const getContactByEmail = async (email: string) => {
  const contact = await prisma.contact.findUnique({ where: { email } });
  return contact;
};

export const getWorkspaceContacts = async (workspaceId: string) => {
  const contacts = await prisma.$transaction(async (tx) => {
    const contactsWithStatus = await tx.ticket.groupBy({
      by: ['contact_id', 'status'],
      where: { workspace_id: workspaceId },
      _count: {
        status: true,
      },
    });

    const contactIdToStatusCountMap: Record<
      string,
      Record<TicketStatus, number>
    > = {};

    for (const entry of contactsWithStatus) {
      if (!contactIdToStatusCountMap[entry.contact_id]) {
        contactIdToStatusCountMap[entry.contact_id] = {} as Record<
          TicketStatus,
          number
        >;
      }

      contactIdToStatusCountMap[entry.contact_id][entry.status] =
        entry._count.status;
    }

    const contactIds = Object.keys(contactIdToStatusCountMap);
    const contacts = await tx.contact.findMany({
      where: { id: { in: contactIds } },
    });

    return contacts.map((c) => ({
      ...c,
      ticketsCount: contactIdToStatusCountMap[c.id],
    }));
  });

  return contacts;
};

export const createOrUpdateContact = async (contactDetails: {
  email: string;
  name: string;
}) => {
  removeNullUndefined(contactDetails);

  const contact = await prisma.contact.upsert({
    where: { email: contactDetails.email },
    create: contactDetails,
    update: contactDetails,
  });

  return contact;
};
