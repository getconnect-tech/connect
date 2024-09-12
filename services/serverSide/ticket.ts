import {
  MessageType,
  PriorityLevels,
  Prisma,
  TicketSource,
  TicketStatus,
} from '@prisma/client';
import { createOrUpdateContact } from './contact';
import { prisma } from '@/prisma/prisma';
import { removeNullUndefined } from '@/helpers/common';

type TicketWithPayload = Prisma.TicketGetPayload<{
  include: {
    labels: { include: { label: true } };
    contact: true;
    assigned_user: true;
  };
}>;

export const getWorkspaceTickets = async (
  workspaceId: string,
  userId: string,
  lastUpdated?: string,
) => {
  const query: Prisma.TicketWhereInput = { workspace_id: workspaceId };

  if (lastUpdated) {
    const lastUpdatedDate = new Date(lastUpdated);
    query.updated_at = { gt: lastUpdatedDate };
  }

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
        take: 1,
        orderBy: { created_at: 'desc' },
      },
    },
  });

  const ticketIds = tickets.map((t) => t.id);

  const ticketLastSeen = await prisma.ticketUser.findMany({
    where: { ticket_id: { in: ticketIds }, user_id: userId },
    select: { last_seen: true, ticket_id: true },
  });

  const ticketLastSeenMap = new Map<string, Date>();
  ticketLastSeen.forEach((t) =>
    ticketLastSeenMap.set(t.ticket_id, new Date(t.last_seen)),
  );

  const ticketsWithLastMessage = tickets.map((ticket) => {
    const { messages, ...rest } = ticket;
    const last_message = messages[0];

    let has_read = false;
    if (ticketLastSeenMap.has(ticket.id)) {
      has_read =
        ticketLastSeenMap.get(ticket.id)!.getTime() >=
        new Date(last_message.created_at).getTime();
    }

    const newTicket = { ...rest, last_message, has_read };

    return newTicket;
  });

  ticketsWithLastMessage.sort(
    (a, b) =>
      new Date(
        b.last_message ? b.last_message.created_at : b.created_at,
      ).getTime() -
      new Date(
        a.last_message ? a.last_message.created_at : a.created_at,
      ).getTime(),
  );

  const formattedTickets = ticketsWithLastMessage.map(
    formatTicket,
  ) as any as (typeof ticketsWithLastMessage)[0][];

  return formattedTickets;
};

export const getTicketById = async (ticketId: string, workspaceId?: string) => {
  const query = { id: ticketId, workspace_id: workspaceId };

  removeNullUndefined(query);

  const ticket = await prisma.ticket.findUnique({
    where: query,
    include: {
      labels: { include: { label: true } },
      contact: true,
      assigned_user: true,
    },
  });

  if (!ticket) {
    return null;
  }

  const formattedTicket = formatTicket(ticket);

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
}: {
  workspaceId: string;
  mailId: string;
  subject: string;
  senderName?: string;
  senderEmail: string;
}) => {
  const name = senderName || senderEmail.split('@')[0]!;
  const contact = await createOrUpdateContact({
    email: senderEmail,
    name,
  });

  const newTicket = await prisma.ticket.create({
    data: {
      workspace_id: workspaceId,
      mail_id: mailId,
      title: subject,
      source: TicketSource.MAIL,
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
    source?: TicketSource;
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

export const formatTicket = (ticket: TicketWithPayload) => {
  const formattedTicket = {
    ...ticket,
    labels: ticket.labels.map((x) => x.label),
  };
  return formattedTicket;
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

export const updateAssignee = async (ticketId: string, newAssignee: string) => {
  const updatedTicket = await prisma.ticket.update({
    where: { id: ticketId },
    data: { assigned_to: newAssignee },
  });

  return updatedTicket;
};
