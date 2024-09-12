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

export interface LastSeen {
  display_name: string | null;
  last_seen: Date;
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
