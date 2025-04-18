import {
  MessageType,
  PriorityLevels,
  Prisma,
  ChannelType,
  TicketStatus,
} from '@prisma/client';
import { prisma } from '@/prisma/prisma';
import { removeNullUndefined } from '@/helpers/common';
import { chatWithOpenAi } from '@/lib/openAi';
import { createOrUpdateContact } from './contact';

export const getWorkspaceTickets = async (
  workspaceId: string,
  userId: string,
  lastUpdated?: string,
  contactIds?: string[],
) => {
  const query: Prisma.TicketWhereInput = { workspace_id: workspaceId };

  if (contactIds) {
    query.contact_id = { in: contactIds };
  }

  // Build the query based on lastUpdated
  if (lastUpdated) {
    const lastUpdatedDate = new Date(lastUpdated);
    query.OR = [
      { updated_at: { gt: lastUpdatedDate } },
      {
        messages: {
          some: {
            created_at: { gt: lastUpdatedDate },
            type: {
              in: [
                // Include message types which doesn't update ticket schema
                MessageType.FROM_CONTACT,
                MessageType.EMAIL,
                MessageType.REGULAR,
                MessageType.CHANGE_LABEL,
              ],
            },
          },
        },
      },
      {
        users: {
          some: {
            user_id: userId,
            last_seen: { gt: lastUpdatedDate },
          },
        },
      },
    ];
  }

  // Use Prisma's select to limit fields retrieved
  const tickets = await prisma.ticket.findMany({
    where: query,
    include: {
      labels: { include: { label: true } },
      contact: true,
      assigned_user: true,
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
        select: {
          created_at: true,
          author: {
            select: {
              id: true,
              email: true,
              display_name: true,
              profile_url: true,
            },
          },
          content: true,
          type: true,
        },
        take: 1, // Only get the most recent message
        orderBy: { created_at: 'desc' },
      },
    },
  });

  const ticketIds = tickets.map((ticket) => ticket.id);

  // Fetch last seen tickets in one go
  const ticketLastSeen = await prisma.ticketUser.findMany({
    where: {
      ticket_id: { in: ticketIds },
      user_id: userId,
    },
    select: { last_seen: true, ticket_id: true },
  });

  // Create a Map for quick lookups
  const ticketLastSeenMap = new Map(
    ticketLastSeen.map((t) => [t.ticket_id, new Date(t.last_seen)]),
  );

  // Build the final ticket structure
  const ticketsWithLastMessage = tickets.map((ticket) => {
    const { messages, ...rest } = ticket;
    const last_message = messages[0];

    const has_read =
      ticketLastSeenMap.has(ticket.id) &&
      ticketLastSeenMap.get(ticket.id)!.getTime() >=
        new Date(last_message.created_at).getTime();

    return { ...rest, last_message, has_read };
  });

  // Sort tickets based on last message or ticket creation date
  ticketsWithLastMessage.sort((a, b) => {
    const aTime = a.last_message
      ? new Date(a.last_message.created_at).getTime()
      : new Date(a.created_at).getTime();
    const bTime = b.last_message
      ? new Date(b.last_message.created_at).getTime()
      : new Date(b.created_at).getTime();
    return bTime - aTime;
  });

  // Format tickets before returning
  const formattedTickets = ticketsWithLastMessage.map((ticket) => ({
    ...ticket,
    labels: ticket.labels.map((x) => x.label),
  }));

  return formattedTickets;
};

export const getTicketById = async (ticketId: string, workspaceId?: string) => {
  const query = { id: ticketId, workspace_id: workspaceId };

  removeNullUndefined(query);

  const ticket = await prisma.ticket.findUnique({
    where: query,
    include: {
      labels: { include: { label: true } },
      assigned_user: true,
    },
  });

  if (!ticket) {
    return null;
  }

  const formattedTicket = {
    ...ticket,
    labels: ticket.labels.map((x) => x.label),
  };

  return formattedTicket;
};

export const getTicketByMailId = async (mailId: string) => {
  const ticket = await prisma.ticket.findUnique({ where: { mail_id: mailId } });
  return ticket;
};

export const createTicket = async ({
  workspaceId,
  mailId,
  subject,
  senderName,
  senderEmail,
  source,
}: {
  workspaceId: string;
  mailId?: string;
  subject: string;
  senderName?: string;
  senderEmail: string;
  source: ChannelType;
}) => {
  const contact = await createOrUpdateContact({
    email: senderEmail,
    name: senderName,
    workspaceId,
  });

  const newTicket = await prisma.ticket.create({
    data: {
      workspace_id: workspaceId,
      mail_id: mailId,
      title: subject,
      source,
      contact_id: contact.id,
      subject,
    },
  });

  return newTicket;
};

export const updateTicket = async (
  ticketId: string,
  ticketUpdates: {
    title?: string;
    priority?: PriorityLevels;
    source?: ChannelType;
    contactId?: string;
    assignedTo?: string;
    status?: TicketStatus;
    snoozeUntil?: string;
  },
) => {
  const update: any = {
    title: ticketUpdates.title,
    priority: ticketUpdates.priority,
    source: ticketUpdates.source,
    contact_id: ticketUpdates.contactId,
    assigned_to: ticketUpdates.assignedTo,
    status: ticketUpdates.status,
  };

  if (ticketUpdates.snoozeUntil) {
    update.snooze_until = ticketUpdates.snoozeUntil;
  }

  removeNullUndefined(update);

  const newTicket = await prisma.ticket.update({
    where: { id: ticketId },
    data: update,
  });

  return newTicket;
};

export const addLabel = async (ticketId: string, labelId: string) => {
  const ticketLabelRelation = await prisma.ticketLabel.create({
    data: { ticket_id: ticketId, label_id: labelId },
  });

  return ticketLabelRelation;
};

export const removeLabel = async (ticketId: string, labelId: string) => {
  const deletedTicket = await prisma.ticketLabel.delete({
    where: { ticket_label_id: { ticket_id: ticketId, label_id: labelId } },
  });
  return deletedTicket;
};

export const updatePriority = async (
  ticketId: string,
  newPriority: PriorityLevels,
) => {
  const updatedTicket = await prisma.ticket.update({
    where: { id: ticketId },
    data: { priority: newPriority },
  });

  return updatedTicket;
};

export const updateStatus = async (
  ticketId: string,
  newStatus: TicketStatus,
  snoozeUntil?: string,
) => {
  const payload = {
    status: newStatus,
    snooze_until: snoozeUntil,
  };

  removeNullUndefined(payload);

  const updatedTicket = await prisma.ticket.update({
    where: { id: ticketId },
    data: payload,
  });

  return updatedTicket;
};

export const updateAssignee = async (
  ticketId: string,
  newAssignee: string | null,
) => {
  const updatedTicket = await prisma.ticket.update({
    where: { id: ticketId },
    data: { assigned_to: newAssignee },
  });

  return updatedTicket;
};

export const generateTicketTitle = async (ticketDesc: string) => {
  const prompt = `Generate a single line title (without any quotes) for a ticket with message:\n${ticketDesc}`;

  const generatedTitle = await chatWithOpenAi(prompt);

  return generatedTitle;
};
