export interface WebhookPayload {
  _id?: string;
  message_id: string;
}

const outboundEventTypes = [
  'accepted',
  'delivered',
  'rejected',
  'deferred',
  'failed',
  'opened',
  'clicked',
  'complained',
];

export const isInbound = (
  payload: WebhookPayload,
): payload is InboundEmailPayload => {
  return !!payload._id;
};

export const isOutbound = (
  payload: WebhookPayload,
): payload is OutboundPayload => {
  const eventType = (payload as OutboundPayload).event_type;
  return outboundEventTypes.includes(eventType);
};

export const isOpenOutbound = (
  payload: OutboundPayload,
): payload is OpenOutboundPayload => {
  const eventType = (payload as OpenOutboundPayload).event_type;
  return eventType === 'opened';
};

export const isDeliveryOutbound = (
  payload: OutboundPayload,
): payload is DeliveryOutboundPayload =>
  (payload as DeliveryOutboundPayload).event_type === 'delivered';

export const isBounceOutbound = (
  payload: OutboundPayload,
): payload is BounceOutboundPayload => {
  const eventType = (payload as BounceOutboundPayload).event_type;
  return eventType === 'failed' || eventType === 'deferred';
};

export const isLinkClickOutbound = (
  payload: OutboundPayload,
): payload is LinkClickOutboundPayload =>
  (payload as LinkClickOutboundPayload).event_type === 'clicked';

export interface InboundEmailPayload extends WebhookPayload {
  _id: string;
  domain: string;
  envelope_sender: string;
  recipients: string[];
  headers: {
    [key: string]: string[];
  };
  body: {
    plaintext: string;
    stripped_plaintext: string;
    html: string;
    stripped_html: string;
    other_parts: any; // or null, or a more specific type if known
    raw_mime: {
      url: string;
      size: number;
    };
  };
  attachments: WebhookAttachment[] | null;
  spf_result: string;
  dkim_result: boolean;
  is_dmarc_aligned: boolean;
  is_spam: boolean;
  deletion_url: string;
  validation_url: string;
  processed_at: number;
}

export interface WebhookAttachment {
  filename: string;
  content_id: string;
  content_type: string;
  url: string;
  size: number;
}

export interface OutboundPayload extends WebhookPayload {
  event_type:
    | 'accepted'
    | 'opened'
    | 'delivered'
    | 'rejected'
    | 'deferred'
    | 'failed'
    | 'clicked';
  domain_id: number;
  tags: null | { name: string; value: string }[];
}

export interface DeliveryOutboundPayload extends OutboundPayload {
  event_type: 'delivered';
  event_data: { from: string[]; to: string[] };
  event_id: string;
  event_time: number;
}

export interface BounceOutboundPayload extends OutboundPayload {
  event_type: 'failed' | 'deferred';
  event_data: { reason: string; to: string };
  event_id: string;
  event_time: number;
}

export interface OpenOutboundPayload extends OutboundPayload {
  event_type: 'opened';
  event_data: { ip: string; user_agent: string };
  event_id: string;
  event_time: number;
  inserted_at: string;
}

export interface LinkClickOutboundPayload extends OutboundPayload {
  event_type: 'clicked';
  event_data: { ip: string; original_url: string; user_agent: string };
  event_id: string;
  event_time: number;
  inserted_at: string;
}
