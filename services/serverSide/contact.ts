import { TicketStatus } from '@prisma/client';
import moment from 'moment';
import { prisma } from '@/prisma/prisma';
import { findUserByEmail, getUserActivities } from '@/lib/amplitude';

export const getContactByEmail = async (email: string, workspaceId: string) => {
  const contact = await prisma.contact.findUnique({
    where: { workspace_email_id: { email, workspace_id: workspaceId } },
  });
  return contact;
};

export const getContactById = async (contactId: string) => {
  const contact = await prisma.contact.findUnique({ where: { id: contactId } });

  return contact;
};

export const getWorkspaceContacts = async (workspaceId: string) => {
  const workspaceContacts = await prisma.contact.findMany({
    where: {
      workspace_id: workspaceId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      group_id: true,
      workspace_id: true,
      created_at: true,
      updated_at: true,
      tickets: {
        select: {
          status: true,
        },
      },
    },
  });

  const formattedContacts = workspaceContacts.map((contact) => {
    const { tickets, ...restContact } = contact;

    const ticketsCount = {} as Record<TicketStatus, number>;

    tickets.forEach((ticket) => {
      ticketsCount[ticket.status] = (ticketsCount[ticket.status] || 0) + 1;
    });

    return {
      ...restContact,
      ticketsCount,
    };
  });

  return formattedContacts;
};

export const createOrUpdateContact = async ({
  email,
  name,
  workspaceId,
}: {
  email: string;
  workspaceId: string;
  name?: string;
}) => {
  const contact = prisma.$transaction(async (tx) => {
    const currentContact = await tx.contact.findUnique({
      where: { workspace_email_id: { email, workspace_id: workspaceId } },
    });

    if (!currentContact) {
      const senderName = name || email.split('@')[0];
      return tx.contact.create({
        data: { email, name: senderName, workspace_id: workspaceId },
      });
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

export const getActivities = async (email: string) => {
  const userMatches = await findUserByEmail(email);

  if (userMatches.length <= 0) {
    return null;
  }

  const userEvents = await getUserActivities(userMatches[0]!.amplitude_id);

  const formattedEventsData = userEvents.map((event) => {
    const { event_type, event_id, event_time, event_properties } = event;

    return {
      event_id,
      event_type,
      event_time: moment(event_time + 'UTC'),
      event_properties,
    };
  });

  return formattedEventsData;
};
