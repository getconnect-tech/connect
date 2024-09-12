import {
  EmailEventType,
  Label,
  MessageType,
  Prisma,
  User,
} from '@prisma/client';
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
    orderBy: { created_at: 'asc' },
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
    include: { tickets_rel: true },
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

  // Get last seen of users
  const lastSeenData = await prisma.ticketUser.findMany({
    where: { ticket_id: ticketId },
    select: {
      user: { select: { id: true, display_name: true } },
      last_seen: true,
    },
  });

  // Format messages by injecting respective data
  const formattedMessages = messages.map((message) => {
    // Message is ready by users whose last_seen is greater than message created time
    const read_by = lastSeenData
      .filter(
        (x) =>
          new Date(x.last_seen).getTime() >=
          new Date(message.created_at).getTime(),
      )
      .map((x) => ({ ...x.user, last_seen: x.last_seen }));

    switch (message.type) {
      case MessageType.CHANGE_ASSIGNEE: {
        const assignee = message.reference_id
          ? usersMap.get(message.reference_id)!
          : null;
        return { ...message, read_by, assignee, label: null };
      }
      case MessageType.CHANGE_LABEL: {
        const label = labelsMap.get(message.reference_id)!;
        return { ...message, read_by, label, assignee: null };
      }
      default:
        return { ...message, read_by, label: null, assignee: null };
    }
  });

  return formattedMessages;
};

export const createEmailEvent = async (
  messageId: string,
  { eventType, extra }: { eventType: EmailEventType; extra: string },
) => {
  const newEvent = await prisma.emailEvent.create({
    data: { event: eventType, extra, message_id: messageId },
  });

  return newEvent;
};

export const getTicketEmailEvents = async (ticketId: string) => {
  const emailEvents = await prisma.emailEvent.findMany({
    where: { message: { ticket_id: ticketId } },
  });

  return emailEvents;
};

export const updateUserLastSeen = async (ticketId: string, userId: string) => {
  const updatedLastSeen = await prisma.ticketUser.upsert({
    where: { ticket_user_id: { ticket_id: ticketId, user_id: userId } },
    create: { ticket_id: ticketId, user_id: userId },
    update: { last_seen: new Date() },
  });

  return updatedLastSeen;
};
