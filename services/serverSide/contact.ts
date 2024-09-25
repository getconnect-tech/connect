import { TicketStatus } from '@prisma/client';
import { prisma } from '@/prisma/prisma';

export const getContactByEmail = async (email: string) => {
  const contact = await prisma.contact.findUnique({ where: { email } });
  return contact;
};

export const getContactById = async (contactId: string) => {
  const contact = await prisma.contact.findUnique({ where: { id: contactId } });

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

export const createOrUpdateContact = async ({
  email,
  name,
}: {
  email: string;
  name?: string;
}) => {
  const contact = prisma.$transaction(async (tx) => {
    const currentContact = await tx.contact.findUnique({
      where: { email },
    });

    if (!currentContact) {
      const senderName = name || email.split('@')[0];
      return tx.contact.create({ data: { email, name: senderName } });
    }

    if (name) {
      return tx.contact.update({
        where: { id: currentContact.id },
        data: { name },
      });
    }

    return currentContact;
  });

  return contact;
};
