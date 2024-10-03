import { MessageType } from '@prisma/client';
import { getWorkspaceApiKeys } from '@/services/serverSide/apiKey';
import { getWorkspaceContacts } from '@/services/serverSide/contact';
import { getMacros } from '@/services/serverSide/macro';
import { getTicketMessages } from '@/services/serverSide/message';
import {
  getUserWorkspaces,
  getWorkspaceById,
} from '@/services/serverSide/workspace';

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
