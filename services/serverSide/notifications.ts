interface Notification {
  senderId: string;
  receiverId: string;
  title: string;
  body: string;
}

// Centralized service to manage & send notifications
export class NotificationProvider {
  // service to get user notifications settings
  static getUserNotificationSettings() {}

  // main service to send notifications
  static sendNotification(notification: Notification) {
    return notification;
  }

  // service to send push notifications to web & mobile
  static sendPushNotification() {}

  // service to send email notifications
  static sendEmailNotification() {}
}
