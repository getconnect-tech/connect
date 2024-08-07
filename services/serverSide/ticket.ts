import { prisma } from '@/prisma/prisma';

export const getWorkspaceTickets = async (workspaceId: string) => {
  const tickets = await prisma.ticket.findMany({
    where: { workspace_id: workspaceId },
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
}: {
  workspaceId: string;
  mailId: string;
  subject: string;
}) => {
  const newTicket = await prisma.ticket.create({
    data: {
      workspace_id: workspaceId,
      mail_id: mailId,
      title: subject,
    },
  });

  return newTicket;
};
