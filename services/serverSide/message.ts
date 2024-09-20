import {
  ChannelType,
  EmailEventType,
  Label,
  MessageType,
  Prisma,
  User,
} from '@prisma/client';
import { getTicketAttachments } from './firebaseServices';
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
    channel: ChannelType.MAIL,
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
  // get workspace
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    select: { workspace_id: true },
  });

  if (!ticket) {
    throw new Error('Invalid ticket id!');
  }

  // const workspaceId = ticket.workspace_id;

  // fetch raw messages data
  const messages = await prisma.message.findMany({
    where: { ticket_id: ticketId },
    include: {
      author: true,
      email_events: {
        where: { event: EmailEventType.OPENED },
        select: { created_at: true, extra: true },
      },
    },
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

  // Collect email Ids of all distinct Contact emails
  const allContactEmails = Array.from(
    new Set(messages.map((x) => x.email_events.map((y) => y.extra)).flat()),
  );

  // Fetch all Contacts by emails
  const contactsData = await prisma.contact.findMany({
    where: { email: { in: allContactEmails } },
    select: { email: true, name: true, id: true },
  });

  // Create map with email id -> contact object
  const contactsMap = new Map<string, (typeof contactsData)[number]>();
  for (const contact of contactsData) {
    contactsMap.set(contact.email, contact);
  }

  // get Message attachments
  const messageAttachmentsMap = await getTicketAttachments(
    ticket.workspace_id,
    ticketId,
  );

  // Format messages by injecting respective data
  const formattedMessages = messages.map((m) => {
    const { email_events, ...message } = m;
    const read_by = email_events.map((event) => {
      const email = event.extra;
      const contact = contactsMap.get(email)!;

      return {
        ...contact,
        seen_at: event.created_at,
      };
    });
    const attachments = messageAttachmentsMap[message.id] || [];

    switch (message.type) {
      case MessageType.CHANGE_ASSIGNEE: {
        const assignee = message.reference_id
          ? usersMap.get(message.reference_id)!
          : null;
        return { ...message, read_by, assignee, label: null, attachments };
      }
      case MessageType.CHANGE_LABEL: {
        const label = labelsMap.get(message.reference_id)!;
        return { ...message, read_by, label, assignee: null, attachments };
      }
      default:
        return {
          ...message,
          read_by,
          label: null,
          assignee: null,
          attachments,
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
