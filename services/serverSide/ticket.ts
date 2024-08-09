import { PriorityLevels, TicketSource } from '@prisma/client';
import { prisma } from '@/prisma/prisma';
import { removeNullUndefined } from '@/helpers/common';

export const getWorkspaceTickets = async (workspaceId: string) => {
  const tickets = await prisma.ticket.findMany({
    where: { workspace_id: workspaceId },
    orderBy: { created_at: 'desc' },
    include: { labels: { include: { label: true } } },
  });

  const formattedTickets = tickets.map((ticket) => ({
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
    include: { labels: { include: { label: true } } },
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
}: {
  workspaceId: string;
  mailId: string;
  subject: string;
  senderName: string;
  senderEmail: string;
}) => {
  const newTicket = await prisma.ticket.create({
    data: {
      workspace_id: workspaceId,
      mail_id: mailId,
      title: subject,
      source: TicketSource.MAIL,
      sender_name: senderName,
      sender_mail: senderEmail,
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
    contanctId?: string;
    assignedTo?: string;
    senderName?: string;
    senderEmail?: string;
  },
) => {
  removeNullUndefined(ticketUpdates);

  const newTicket = await prisma.ticket.update({
    where: { id: ticketId },
    data: ticketUpdates,
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
  const res = await prisma.ticketLabel.deleteMany({
    where: { ticket_id: ticketId, label_id: labelId },
  });
  return res;
};
