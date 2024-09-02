import {
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
  lastUpdated?: string,
) => {
  const query: Prisma.TicketWhereInput = { workspace_id: workspaceId };

  if (lastUpdated) {
    const lastUpdatedDate = new Date(lastUpdated);
    query.updated_at = { gt: lastUpdatedDate };
  }

  const tickets = await prisma.ticket.findMany({
    where: query,
    orderBy: { created_at: 'desc' },
    include: {
      labels: { include: { label: true } },
      contact: true,
      assigned_user: true,
    },
  });

  const formattedTickets = tickets.map(formatTicket);

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
  if (newStatus === TicketStatus.SNOOZE && !snoozeUntil) {
    throw new Error('snoozeUntil is required for status type SNOOZE');
  }

  const payload = {
    status: newStatus,
    snoozeUntil: snoozeUntil,
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
