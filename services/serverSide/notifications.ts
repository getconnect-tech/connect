import { getMessageById } from './message';
import { sendOneSignalNotification } from '@/lib/oneSignal';
import { getUserById } from '@/services/serverSide/user';
import { getTicketById } from '@/services/serverSide/ticket';
import { getContactByEmail } from '@/services/serverSide/contact';
import { htmlToString } from '@/helpers/common';

interface Notification {
  title: string;
  body: string;
  receiverIds: string[];
  url?: string;
}

interface SenderInfo {
  id: string;
  name: string;
}

// Centralized service to manage & send notifications
export class NotificationProvider {
  // service to get user notifications settings
  private static getUserNotificationSettings() {
    throw new Error('Not implemented');
  }

  private static async getSenderInfo(
    senderId: string,
    isContact: boolean = false,
  ) {
    let senderInfo: SenderInfo;
    if (isContact) {
      const contactInfo = await getContactByEmail(senderId);

      if (!contactInfo) {
        throw new Error('Invalid sender ID!');
      }

      senderInfo = {
        id: contactInfo.id,
        name: contactInfo.name,
      };
    } else {
      const userInfo = await getUserById(senderId);

      if (!userInfo) {
        throw new Error('Invalid sender ID!');
      }

      senderInfo = {
        id: userInfo.id,
        name: userInfo.display_name || 'Unknown',
      };
    }

    return senderInfo;
  }

  private static async getTicketInfo(ticketId: string) {
    const ticketInfo = await getTicketById(ticketId);

    if (!ticketInfo) {
      throw new Error('Invalid ticket ID!');
    }

    return ticketInfo;
  }

  private static async getMessageInfo(messageId: string) {
    const messageInfo = await getMessageById(messageId);

    if (!messageInfo) {
      throw new Error('Invalid message ID!');
    }

    return messageInfo;
  }

  private static getMentionedUserIds(messageContent: string) {
    // Regex to match the UUID format in the 'title' attribute of <a> tags
    const regex = /title="([a-f0-9-]+)"/g;

    // Find all matches
    const matches = Array.from(messageContent.matchAll(regex));

    // Extract the first capturing group (which contains the UUID) from each match
    const userIds = matches.map((match) => match[1]);

    const uniqueUserIds = Array.from(new Set(userIds));

    return uniqueUserIds;
  }

  // main service to send notifications
  public static sendNotification(notification: Notification) {
    // TODO: fetch user's notifications and send notifications accordingly

    const promises = [];

    promises.push(this.sendPushNotification(notification));

    return promises;
  }

  // service to send push notifications to web & mobile
  private static async sendPushNotification(notification: Notification) {
    const { title, body, receiverIds, url } = notification;

    return sendOneSignalNotification(title, body, receiverIds, url);
  }

  // service to send email notifications
  private static sendEmailNotification() {
    throw new Error('Not implemented');
  }

  public static async sendAssignTicketNotification(
    assignerId: string,
    assignedToId: string,
    ticketId: string,
  ) {
    if (assignerId === assignedToId) {
      return null;
    }

    const senderInfo = await this.getSenderInfo(assignerId);
    const ticketInfo = await this.getTicketInfo(ticketId);

    const title = `${senderInfo.name} has assigned you a ticket`;
    const body = ticketInfo.title;

    const ticketUrl = `/details/${ticketInfo.id}`;

    return this.sendNotification({
      title,
      body,
      receiverIds: [assignedToId],
      url: ticketUrl,
    });
  }

  public static async sendNewMessageNotification(
    senderId: string,
    ticketId: string,
    messageContent: string,
    fromContact: boolean = false,
  ) {
    const senderInfo = await this.getSenderInfo(senderId, fromContact);
    const ticketInfo = await this.getTicketInfo(ticketId);

    if (!ticketInfo.assigned_to || ticketInfo.assigned_to === senderId) {
      return null;
    }

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

  public static async sendMentionsNotification(
    senderId: string,
    ticketId: string,
    messageContent: string,
  ) {
    const mentionedUserIds = this.getMentionedUserIds(messageContent);
    const receiverIds = mentionedUserIds.filter((mId) => mId !== senderId);

    if (receiverIds.length <= 0) {
      return null;
    }

    const senderInfo = await this.getSenderInfo(senderId);
    const ticketInfo = await this.getTicketInfo(ticketId);

    const title = `${senderInfo.name} has mentioned you in a message`;
    const body = htmlToString(messageContent);
    const ticketUrl = `/details/${ticketInfo.id}`;

    return this.sendNotification({
      title,
      body,
      receiverIds,
      url: ticketUrl,
    });
  }

  public static async sendMessageReactionNotification(
    senderId: string,
    messageId: string,
    reaction: string,
  ) {
    const senderInfo = await this.getSenderInfo(senderId);
    const messageInfo = await this.getMessageInfo(messageId);

    const title = `${senderInfo.name} reacted ${reaction} on your message`;
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
