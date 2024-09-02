export interface PostmarkWebhookPayload {
  MessageStream: string;
  MessageID: string;
}

export const isInbound = (
  payload: PostmarkWebhookPayload,
): payload is InboundEmailPayload =>
  (payload as InboundEmailPayload).MessageStream === 'inbound';

export const isOutbound = (
  payload: PostmarkWebhookPayload,
): payload is OutboundPayload =>
  (payload as OutboundPayload).MessageStream === 'outbound';

export const isOpenOutbound = (
  payload: OutboundPayload,
): payload is OpenOutboundPayload =>
  (payload as OpenOutboundPayload).RecordType === 'Open';

export const isDeliveryOutbound = (
  payload: OutboundPayload,
): payload is DeliveryOutboundPayload =>
  (payload as DeliveryOutboundPayload).RecordType === 'Delivery';

export const isBounceOutbound = (
  payload: OutboundPayload,
): payload is BounceOutboundPayload =>
  (payload as BounceOutboundPayload).RecordType === 'Bounce';

export const isLinkClickOutbound = (
  payload: OutboundPayload,
): payload is LinkClickOutboundPayload =>
  (payload as LinkClickOutboundPayload).RecordType === 'Click';

export const isSpamComplaintOutbound = (payload: OutboundPayload) =>
  (payload as SpamComplaintOutboundPayload).RecordType === 'SpamComplaint';

export interface InboundEmailPayload extends PostmarkWebhookPayload {
  FromName: string;
  MessageStream: 'inbound';
  From: string;
  FromFull: FromFull;
  To: string;
  ToFull: ToFull[];
  Cc: string;
  CcFull: CcFull[];
  Bcc: string;
  BccFull: BccFull[];
  OriginalRecipient: string;
  Subject: string;
  ReplyTo: string;
  MailboxHash: string;
  Date: string;
  TextBody: string;
  HtmlBody: string;
  StrippedTextReply: string;
  Tag: string;
  Headers: Header[];
  Attachments: Attachment[];
}

export interface FromFull {
  Email: string;
  Name: string;
  MailboxHash: string;
}

export interface ToFull {
  Email: string;
  Name: string;
  MailboxHash: string;
}

export interface CcFull {
  Email: string;
  Name: string;
  MailboxHash: string;
}

export interface BccFull {
  Email: string;
  Name: string;
  MailboxHash: string;
}

export interface Header {
  Name: string;
  Value: string;
}

export interface Attachment {
  Name: string;
  Content: string;
  ContentType: string;
  ContentLength: number;
}

export interface OutboundPayload extends PostmarkWebhookPayload {
  MessageStream: 'outbound';
  ServerID: number;
  Tag: string;
}

export interface DeliveryOutboundPayload extends OutboundPayload {
  RecordType: 'Delivery';
  Recipient: string;
  DeliveredAt: string;
  Details: string;
}

export interface BounceOutboundPayload extends OutboundPayload {
  ID: number;
  Type: 'HardBounce' | 'SoftBounce';
  RecordType: 'Bounce';
  TypeCode: number;

  Details: string;
  Email: string;
  From: string;
  BouncedAt: string;
  Inactive: boolean;
  DumpAvailable: boolean;
  CanActivate: boolean;
  Subject: string;

  Content: string;
  Name: string;
  Description: string;
}

export interface SpamComplaintOutboundPayload extends OutboundPayload {
  RecordType: 'SpamComplaint';
  Type: 'SpamComplaint';
  ID: number;
  TypeCode: number;

  Details: string;
  Email: string;
  From: string;
  BouncedAt: string;
  Inactive: boolean;
  DumpAvailable: boolean;
  CanActivate: boolean;
  Subject: string;
  Content: string;
  Name: string;
  Description: string;
}

export interface OpenOutboundPayload extends OutboundPayload {
  RecordType: 'Open';
  FirstOpen: boolean;
  Recipient: string;
  ReceivedAt: string;
  Platform: string;
  ReadSeconds: number;
  Tag: string;
}

export interface LinkClickOutboundPayload extends OutboundPayload {
  RecordType: 'Click';
  Recipient: string;
  MessageID: string;
  ReceivedAt: string;
  Platform: string;
  ClickLocation: string;
  OriginalLink: string;
  Tag: string;
}
