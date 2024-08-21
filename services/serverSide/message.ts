import { Label, MessageType, Prisma, User } from '@prisma/client';
import { prisma } from '@/prisma/prisma';

export const postMessage = async ({
  messageContent,
  messageType,
  referenceId,
  ticketId,
  authorId,
}: {
  messageContent: string;
  referenceId: string;
  messageType: MessageType;
  ticketId: string;
  authorId?: string;
}) => {
  const dataToInsert: Prisma.MessageUncheckedCreateInput = {
    content: messageContent,
    reference_id: referenceId,
    type: messageType,
    ticket_id: ticketId,
  };

  if (authorId) {
    dataToInsert.author_id = authorId;
  }

  const newMessage = await prisma.message.create({
    data: dataToInsert,
  });

  return newMessage;
};

export const getTicketMessages = async (ticketId: string) => {
  const messages = await prisma.message.findMany({
    where: { ticket_id: ticketId },
    include: { author: true },
  });

  // Collect Ids of all distinct Assignees
  const allAssigneeIds = Array.from(
    new Set(
      messages
        .filter((x) => x.type === MessageType.CHANGE_ASSIGNEE && x.reference_id)
        .map((x) => x.reference_id),
    ),
  );

  // Fetch data of all assignees in a single batch
  const usersData = await prisma.user.findMany({
    where: { id: { in: allAssigneeIds } },
  });

  // Create map with assignee id -> user object
  const usersMap = new Map<string, User>();
  for (const user of usersData) {
    usersMap.set(user.id, user);
  }

  // Collect Ids of all distinct Labels
  const allLabelIds = Array.from(
    new Set(
      messages
        .filter((x) => x.type === MessageType.CHANGE_LABEL)
        .map((x) => x.reference_id),
    ),
  );

  // Fetch data of all labels in a single batch
  const labelsData = await prisma.label.findMany({
    where: { id: { in: allLabelIds } },
  });

  // Create map with label id -> label object
  const labelsMap = new Map<string, Label>();
  for (const label of labelsData) {
    labelsMap.set(label.id, label);
  }

  // Format messages by injecting respective data
  const formattedMessages = messages.map((message) => {
    switch (message.type) {
      case MessageType.CHANGE_ASSIGNEE: {
        const assignee = message.reference_id
          ? usersMap.get(message.reference_id)!
          : null;
        return { ...message, assignee };
      }
      case MessageType.CHANGE_LABEL: {
        const label = labelsMap.get(message.reference_id)!;
        return { ...message, label };
      }
      default:
        return message;
    }
  });

  return formattedMessages;
};
