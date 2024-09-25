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
  // Fetch ticket and workspace in one query
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    select: { workspace_id: true },
  });

  if (!ticket) throw new Error('Invalid ticket id!');

  // Fetch messages with necessary data, filtering and selecting only the needed fields
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

  // Extract unique assignee and label IDs
  const assigneeIds = new Set<string>();
  const labelIds = new Set<string>();
  const contactEmails = new Set<string>();

  for (const message of messages) {
    if (message.type === MessageType.CHANGE_ASSIGNEE && message.reference_id) {
      assigneeIds.add(message.reference_id);
    }
    if (message.type === MessageType.CHANGE_LABEL && message.reference_id) {
      labelIds.add(message.reference_id);
    }
    message.email_events.forEach((event) => contactEmails.add(event.extra));
  }

  // Fetch assignees, labels, contacts, and attachments concurrently
  const [assignees, labels, contacts, messageAttachmentsMap] =
    await Promise.all([
      prisma.user.findMany({
        where: { id: { in: Array.from(assigneeIds) } },
        select: { id: true, display_name: true },
      }),
      prisma.label.findMany({
        where: { id: { in: Array.from(labelIds) } },
        select: { id: true, name: true }, // Only fetch fields we care about
      }),
      prisma.contact.findMany({
        where: { email: { in: Array.from(contactEmails) } },
        select: { email: true, name: true, id: true },
      }),
      getTicketAttachments(ticket.workspace_id, ticketId),
    ]);

  // Create maps for quick lookup
  const assigneesMap = new Map(
    assignees.map((assignee) => [assignee.id, assignee]),
  );
  const labelsMap = new Map(labels.map((label) => [label.id, label]));
  const contactsMap = new Map(
    contacts.map((contact) => [contact.email, contact]),
  );

  // Format messages with the necessary data
  const formattedMessages = messages.map((message) => {
    const { email_events, users_rel, ...msgData } = message;

    // Process read_by from email_events
    const read_by = email_events
      .map((event) => {
        const contact = contactsMap.get(event.extra);
        return contact ? { ...contact, seen_at: event.created_at } : null;
      })
      .filter(Boolean);

    // Process reactions
    const reactions = users_rel.map((rel) => ({
      reaction: rel.reaction,
      author: rel.user,
    }));

    // Process attachments from the map
    const attachments = messageAttachmentsMap[message.id] || [];

    // Format message based on type
    switch (message.type) {
      case MessageType.CHANGE_ASSIGNEE: {
        return {
          ...msgData,
          read_by,
          assignee: message.reference_id
            ? assigneesMap.get(message.reference_id)
            : null,
          label: null,
          attachments,
          reactions,
        };
      }
      case MessageType.CHANGE_LABEL: {
        return {
          ...msgData,
          read_by,
          assignee: null,
          label: labelsMap.get(message.reference_id),
          attachments,
          reactions,
        };
      }
      default:
        return {
          ...msgData,
          read_by,
          assignee: null,
          label: null,
          attachments,
          reactions,
        };
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
