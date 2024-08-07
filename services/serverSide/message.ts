import { MessageType } from '@prisma/client';
import { prisma } from '@/prisma/prisma';

export const postMessage = async ({
  messageContent,
  messageType,
  referenceId,
  subject,
  ticketId,
}: {
  messageContent: string;
  referenceId: string;
  subject: string;
  messageType: MessageType;
  ticketId: string;
}) => {
  const newMessage = await prisma.message.create({
    data: {
      content: messageContent,
      reference_id: referenceId,
      subject,
      type: messageType,
      ticket_id: ticketId,
    },
  });

  return newMessage;
};

export const getTicketMessages = async (ticketId: string) => {
  const messages = await prisma.message.findMany({
    where: { ticket_id: ticketId },
  });
  return messages;
};
