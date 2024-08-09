import { PriorityLevels, TicketSource } from '@prisma/client';
import { prisma } from '@/prisma/prisma';
import { removeNullUndefined } from '@/helpers/common';

export const getWorkspaceTickets = async (workspaceId: string) => {
  const tickets = await prisma.ticket.findMany({
    where: { workspace_id: workspaceId },
    orderBy: { created_at: 'desc' },
  });
  return tickets;
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
