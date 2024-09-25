import {
  ChannelType,
  EmailEventType,
  MessageType,
  Prisma,
} from '@prisma/client';
import { getTicketAttachments } from './firebaseServices';
import { prisma } from '@/prisma/prisma';

export const postMessage = async ({
  messageContent,
  messageType,
  referenceId,
  ticketId,
  authorId,
  channel,
}: {
  messageContent: string;
  referenceId: string;
  messageType: MessageType;
  ticketId: string;
  authorId?: string;
  channel: ChannelType;
}) => {
  const dataToInsert: Prisma.MessageUncheckedCreateInput = {
    content: messageContent,
    reference_id: referenceId,
    type: messageType,
    ticket_id: ticketId,
    channel,
  };

  if (authorId) {
    dataToInsert.author_id = authorId;
  }

  const newMessage = await prisma.message.create({
    data: dataToInsert,
  });

  return newMessage;
};

export const getMessageById = async (messageId: string) => {
  const message = await prisma.message.findUnique({ where: { id: messageId } });
  return message;
};

export const getTicketMessages = async (ticketId: string) => {
  // Pre-fetch ticket and workspace details
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    select: { workspace_id: true },
  });

  if (!ticket) throw new Error('Invalid ticket id!');

  // Fetch all related message data in one query with selected fields only
  const messages = await prisma.message.findMany({
    where: { ticket_id: ticketId },
    include: {
      author: {
        select: { id: true, display_name: true },
      },
      email_events: {
        where: { event: EmailEventType.OPENED },
        select: { created_at: true, extra: true },
      },
      users_rel: {
        select: {
          reaction: true,
          user: {
            select: { id: true, display_name: true },
          },
        },
      },
    },
    orderBy: { created_at: 'asc' },
  });

  // Early return if no messages
  if (!messages.length) return [];

  // Gather all reference ids in one loop to reduce extra passes
  const allAssigneeIds = new Set<string>();
  const allLabelIds = new Set<string>();
  const allContactEmails = new Set<string>();

  for (const message of messages) {
    if (message.type === MessageType.CHANGE_ASSIGNEE && message.reference_id) {
      allAssigneeIds.add(message.reference_id);
    }
    if (message.type === MessageType.CHANGE_LABEL && message.reference_id) {
      allLabelIds.add(message.reference_id);
    }
    message.email_events.forEach((event) => allContactEmails.add(event.extra));
  }

  // Combine all queries into one Promise.all for concurrent execution
  const [assigneesData, labelsData, contactsData, messageAttachmentsMap] =
    await Promise.all([
      prisma.user.findMany({
        where: { id: { in: Array.from(allAssigneeIds) } },
        select: { id: true, display_name: true }, // Limit the fields
      }),
      prisma.label.findMany({
        where: { id: { in: Array.from(allLabelIds) } },
        select: { id: true, name: true }, // Only fetch relevant fields
      }),
      prisma.contact.findMany({
        where: { email: { in: Array.from(allContactEmails) } },
        select: { email: true, name: true, id: true },
      }),
      getTicketAttachments(ticket.workspace_id, ticketId), // Use optimized attachment fetching
    ]);

  // Create maps for efficient lookup
  const assigneesMap = new Map(
    assigneesData.map((assignee) => [assignee.id, assignee]),
  );
  const labelsMap = new Map(labelsData.map((label) => [label.id, label]));
  const contactsMap = new Map(
    contactsData.map((contact) => [contact.email, contact]),
  );

  // Process messages in a single loop for efficiency
  return messages.map((message) => {
    const { email_events, users_rel, ...messageData } = message;

    // Process read_by from email_events
    const read_by = email_events
      .map((event) => {
        const contact = contactsMap.get(event.extra);
        return contact ? { ...contact, seen_at: event.created_at } : null;
      })
      .filter(Boolean); // Filter out any null values

    // Process reactions in one go
    const reactions = users_rel.map((rel) => ({
      reaction: rel.reaction,
      author: rel.user,
    }));

    // Attachments are lazily fetched from the map
    const attachments = messageAttachmentsMap[message.id] || [];

    // Format message based on its type
    switch (message.type) {
      case MessageType.CHANGE_ASSIGNEE:
        return {
          ...messageData,
          read_by,
          assignee: message.reference_id
            ? assigneesMap.get(message.reference_id)
            : null,
          label: null,
          attachments,
          reactions,
        };

      case MessageType.CHANGE_LABEL:
        return {
          ...messageData,
          read_by,
          label: labelsMap.get(message.reference_id),
          assignee: null,
          attachments,
          reactions,
        };

      default:
        return {
          ...messageData,
          read_by,
          assignee: null,
          label: null,
          attachments,
          reactions,
        };
    }
  });
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

export const reactMessage = async (
  messageId: string,
  userId: string,
  reaction: string,
) => {
  const messageInfo = await getMessageById(messageId);

  if (!messageInfo) {
    throw new Error('Invalid message ID!');
  }

  if (messageInfo.type !== MessageType.REGULAR) {
    throw new Error('Can only react to Regular messages!');
  }

  const newReaction = await prisma.$transaction(async (tx) => {
    const whereClause = {
      user_message_id: { user_id: userId, message_id: messageId },
    };

    const currentReaction = await tx.userMessage.findUnique({
      where: whereClause,
      select: { reaction: true },
    });

    if (!currentReaction) {
      const newReaction = await tx.userMessage.create({
        data: { user_id: userId, message_id: messageId, reaction },
      });

      return { status: 'created', ...newReaction };
    }

    if (currentReaction.reaction === reaction) {
      const deletedReaction = await tx.userMessage.delete({
        where: whereClause,
      });

      return { status: 'deleted', ...deletedReaction };
    }

    const updatedReaction = await tx.userMessage.update({
      where: whereClause,
      data: { reaction },
    });

    return { status: 'updated', ...updatedReaction };
  });

  return newReaction;
};
