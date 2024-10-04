import { Contact, User } from '@prisma/client';
import { getMessageById } from './message';
import { sendOneSignalNotification } from '@/lib/oneSignal';
import { getUserById } from '@/services/serverSide/user';
import { getTicketById } from '@/services/serverSide/ticket';
import { getContactById } from '@/services/serverSide/contact';
import { htmlToString } from '@/helpers/common';

interface Notification {
  title: string;
  body: string;
  receiverIds: string[];
  url?: string;
}

// Helper type guard to check if the sender is a contact
function isContactType(sender: Contact | User): sender is Contact {
  return (sender as Contact).name !== undefined;
}

// Centralized service to manage & send notifications
export class NotificationProvider {
  // Fetch user notifications settings (not implemented)
  private static getUserNotificationSettings() {
    throw new Error('Not implemented');
  }

  // Fetch sender information (either a contact or a user)
  private static async getSenderInfo(senderId: string, isContact = false) {
    const sender = isContact
      ? await getContactById(senderId)
      : await getUserById(senderId);

    if (!sender) throw new Error('Invalid sender ID!');

    // Use type guard to access the correct property
    const senderName = isContactType(sender)
      ? sender.name
      : sender.display_name || 'Unknown';

    return {
      id: sender.id,
      name: senderName,
    };
  }

  // Fetch ticket information
  private static async getTicketInfo(ticketId: string) {
    const ticket = await getTicketById(ticketId);
    if (!ticket) throw new Error('Invalid ticket ID!');
    return ticket;
  }

  // Fetch message information
  private static async getMessageInfo(messageId: string) {
    const message = await getMessageById(messageId);
    if (!message) throw new Error('Invalid message ID!');
    return message;
  }

  // Extract mentioned user IDs from message content
  private static getMentionedUserIds(content: string): string[] {
    const regex = /data-mention-id="([a-f0-9-]+)"/g;
    const matches = Array.from(content.matchAll(regex)).map(
      (match) => match[1],
    );
    return Array.from(new Set(matches));
  }

  // Send notifications (currently only push notifications)
  public static sendNotification(notification: Notification) {
    return this.sendPushNotification(notification);
  }

  // Send push notification using OneSignal
  private static async sendPushNotification(notification: Notification) {
    const { title, body, receiverIds, url } = notification;
    return sendOneSignalNotification(title, body, receiverIds, url);
  }

  // Send assignment notification for tickets
  public static async notifyTicketAssignment(
    assignerId: string,
    assignedToId: string,
    ticketId: string,
  ) {
    if (assignerId === assignedToId) return null;

    const [senderInfo, ticketInfo] = await Promise.all([
      this.getSenderInfo(assignerId),
      this.getTicketInfo(ticketId),
    ]);

    const title = `${senderInfo.name} assigned you a ticket`;
    const body = ticketInfo.title;
    const ticketUrl = `/details/${ticketInfo.id}`;

    return this.sendNotification({
      title,
      body,
      receiverIds: [assignedToId],
      url: ticketUrl,
    });
  }

  // Send notification for new message
  public static async notifyNewMessage(
    senderId: string,
    ticketId: string,
    messageContent: string,
    fromContact = false,
  ) {
    const [senderInfo, ticketInfo] = await Promise.all([
      this.getSenderInfo(senderId, fromContact),
      this.getTicketInfo(ticketId),
    ]);

    if (!ticketInfo.assigned_to || ticketInfo.assigned_to === senderId)
      return null;

    const title = `${senderInfo.name} sent a message in ${ticketInfo.title}`;
    const body = htmlToString(messageContent);
    const ticketUrl = `/details/${ticketInfo.id}`;

    return this.sendNotification({
      title,
      body,
      receiverIds: [ticketInfo.assigned_to],
      url: ticketUrl,
    });
  }

  // Send notification for mentions in a message
  public static async notifyMentions(
    senderId: string,
    ticketId: string,
    messageContent: string,
  ) {
    const mentionedUserIds = this.getMentionedUserIds(messageContent).filter(
      (id) => id !== senderId,
    );
    console.log(mentionedUserIds);

    if (mentionedUserIds.length === 0) return null;

    const [senderInfo, ticketInfo] = await Promise.all([
      this.getSenderInfo(senderId),
      this.getTicketInfo(ticketId),
    ]);

    const title = `${senderInfo.name} mentioned you in a message`;
    const body = htmlToString(messageContent);
    const ticketUrl = `/details/${ticketInfo.id}`;

    return this.sendNotification({
      title,
      body,
      receiverIds: mentionedUserIds,
      url: ticketUrl,
    });
  }

  // Send notification for message reactions
  public static async notifyMessageReaction(
    senderId: string,
    messageId: string,
    reaction: string,
  ) {
    const [senderInfo, messageInfo] = await Promise.all([
      this.getSenderInfo(senderId),
      this.getMessageInfo(messageId),
    ]);

    if (messageInfo.author_id === senderId) {
      return null;
    }

    const title = `${senderInfo.name} reacted ${reaction} to your message`;
    const body = htmlToString(messageInfo.content);
    const ticketUrl = `/details/${messageInfo.ticket_id}`;

    return this.sendNotification({
      title,
      body,
      receiverIds: [messageInfo.author_id!],
      url: ticketUrl,
    });
  }
}
