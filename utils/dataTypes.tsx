import { MessageType } from '@prisma/client';
import { getWorkspaceApiKeys } from '@/services/serverSide/apiKey';
import { getWorkspaceContacts } from '@/services/serverSide/contact';
import { getMacros } from '@/services/serverSide/macro';
import { getTicketMessages } from '@/services/serverSide/message';
import {
  getUserWorkspaces,
  getWorkspaceById,
} from '@/services/serverSide/workspace';
import { getWorkspaceGroups } from '@/services/serverSide/group';

export interface InviteModal {
  name: string;
  email: string;
}

export interface LabelData {
  labelId: string;
  label: string;
  icon: string;
}

export interface ReadBy {
  name: string | null;
  email: string;
  seen_at: Date;
  id: string;
}

export type Workspace = NonNullable<
  Awaited<ReturnType<typeof getUserWorkspaces>>
>[0];

export type CurrentWorkspace = NonNullable<
  Awaited<ReturnType<typeof getWorkspaceById>>
>;

export type MessageDetails = NonNullable<
  Awaited<ReturnType<typeof getTicketMessages>>
>[0];

export type ApiKey = NonNullable<
  Awaited<ReturnType<typeof getWorkspaceApiKeys>>
>[0];

export type Contact = NonNullable<
  Awaited<ReturnType<typeof getWorkspaceContacts>>
>[0];

export type Group = NonNullable<
  Awaited<ReturnType<typeof getWorkspaceGroups>>
>[0];

export type EmailConfig = {
  primaryEmail: string;
};

export type Macros = NonNullable<Awaited<ReturnType<typeof getMacros>>>[0];

export type MessageAttachment = {
  fileName: string;
  contentId: string;
  size: string;
  contentType: string;
  downloadUrl: string;
};

export type MessageSummary = {
  content: string;
  type: MessageType;
  author: {
    email: string;
    display_name: string | null;
  };
};

export type TicketSummary = {
  ticketSummary: string;
  contactSentiment: string;
};

export type AmplitudeUserSearchResponse =
  | {
      matches: [
        {
          user_id: string;
          amplitude_id: number;
        },
      ];
      type: 'match_user_or_device_id';
    }
  | { type: 'nomatch'; matches: [] };

export type AmplitudeEvent = {
  app: number;
  device_id: string;
  user_id: string;
  client_event_time: Date;
  event_id: number;
  session_id: number;
  event_type: string;
  amplitude_event_type: null;
  version_name: null;
  platform: null;
  os_name: null;
  os_version: null;
  data_type: string;
  device_brand: null;
  device_manufacturer: null;
  device_model: null;
  device_family: null;
  device_type: null;
  device_carrier: null;
  location_lat: null;
  location_lng: null;
  ip_address: null;
  country: null;
  language: null;
  library: string;
  city: null;
  region: null;
  dma: null;
  event_properties: object;
  user_properties: object;
  global_user_properties: object;
  group_properties: object;
  event_time: Date;
  client_upload_time: Date;
  server_upload_time: Date;
  server_received_time: Date;
  amplitude_id: number;
  idfa: null;
  adid: null;
  paying: null;
  start_version: null;
  user_creation_time: null;
  uuid: string;
  groups: object;
  sample_rate: null;
  $insert_id: string;
  $insert_key: null;
  is_attribution_event: boolean;
  amplitude_attribution_ids: null;
  plan: object;
  partner_id: null;
  source_id: null;
  $schema: number;
  raw_event_type: string;
  os: null;
};

export type UserActivity = {
  event_id: number;
  event_type: string;
  event_time: string;
  event_properties: object;
};
