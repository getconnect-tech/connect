import { MessageType, TicketStatus } from '@prisma/client';
import moment from 'moment';
import { prisma } from '@/prisma/prisma';
import { findUserByEmail, getUserActivities } from '@/lib/amplitude';
import { Contact } from '@/utils/appTypes';
import { generateContactName, removeNullUndefined } from '@/helpers/common';

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

export const getContactDetails = async (contactId: string) => {
  const contact = await prisma.contact.findUnique({
    where: { id: contactId },
    select: {
      name: true,
      email: true,
      phone: true,
      groups: {
        select: {
          group: true,
        },
      },
    },
  });
  return contact;
};

export const getContactTickets = async (contactId: string) => {
  const contact = await prisma.contact.findUnique({
    where: { id: contactId },
    select: {
      id: true,
      email: true,
      name: true,
      tickets: {
        select: {
          id: true,
          title: true,
          subject: true,
          status: true,
          priority: true,
          created_at: true,
          updated_at: true,
          contact: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          assigned_user: {
            select: {
              id: true,
              email: true,
              display_name: true,
              profile_url: true,
            },
          },
          labels: {
            select: {
              label: true,
            },
          },
          messages: {
            where: {
              type: {
                in: [
                  MessageType.FROM_CONTACT,
                  MessageType.EMAIL,
                  MessageType.REGULAR,
                ],
              },
            },
            orderBy: {
              created_at: 'desc',
            },
            take: 1,
            select: {
              created_at: true,
              content: true,
              type: true,
              author: {
                select: {
                  id: true,
                  email: true,
                  display_name: true,
                  profile_url: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return contact;
};

export const getWorkspaceContacts = async (workspaceId: string) => {
  const workspaceContacts = await prisma.contact.findMany({
    where: {
      workspace_id: workspaceId,
    },
    include: {
      tickets: {
        select: {
          status: true,
        },
      },
      groups: {
        select: {
          group: {
            select: {
              id: true,
              group_id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
    },
  });

  const formattedContacts = workspaceContacts.map((contact) => {
    const { tickets, groups, ...restContact } = contact;

    const ticketsCount = {} as Record<TicketStatus, number>;

    for (const status of Object.values(TicketStatus)) {
      ticketsCount[status] = 0;
    }

    tickets.forEach(({ status }) => ticketsCount[status]++);

    return {
      ...restContact,
      ticketsCount,
      groups: groups.map((g) => g.group),
    };
  });

  return formattedContacts;
};

type ContactPayload = Omit<Partial<Contact>, 'id' | 'workspace_id'> & {
  workspaceId?: string;
  contactId?: string;
};
export const createOrUpdateContact = async (contact: ContactPayload) => {
  const { workspaceId, contactId, email, ...update } = contact;

  // Validation: Either contactId or (workspaceId + email) must be provided
  if (!contactId && (!workspaceId || !email)) {
    throw new Error("Please provide 'contact_id' or 'workspace_id' & 'email'.");
  }

  // Utility function to remove null or undefined properties
  removeNullUndefined(update);

  const updatedContact = await prisma.$transaction(async (tx) => {
    let currentContact;

    // Check if contact exists by contactId or workspace + email combination
    if (contactId) {
      // Search by contactId if provided
      currentContact = await tx.contact.findUnique({
        where: { id: contactId },
      });

      if (!currentContact) {
        throw new Error('Invalid contact ID!');
      }
    } else {
      // Otherwise, search by workspaceId and email
      currentContact = await tx.contact.findUnique({
        where: {
          workspace_email_id: { workspace_id: workspaceId!, email: email! },
        },
      });
    }

    if (!currentContact) {
      // Generate name if not provided
      update.name = update.name ?? generateContactName(update, email!);

      return await tx.contact.create({
        data: {
          workspace_id: workspaceId!,
          email: email!,
          ...update,
          name: update.name!,
        },
      });
    }

    return await prisma.contact.update({
      where: { id: currentContact.id },
      data: { ...update },
    });
  });

  return updatedContact;
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

export const getContactGroups = async (contactId: string) => {
  const contactGroups = await prisma.contactGroup.findMany({
    where: { contact_id: contactId },
    select: {
      group: true,
    },
  });

  const groups = contactGroups.map((cg) => cg.group);

  return groups;
};
