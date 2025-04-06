import { PriorityLevels, TicketStatus } from '@prisma/client';
import { MessageType } from '@prisma/client';

export interface GroupInfo {
  id: string;
  group_id: string | null;
  name: string;
  avatar: string | null;
  group_label: string | null;
  contacts_count: number | null;
  ticketsCount: Record<TicketStatus, number>;
  created_at: Date;
  updated_at: Date;
  workspace_id: string;
}

export interface Group {
  id: string;
  group_id?: string;
  name: string;
  avatar?: string;
  group_label?: string;
  contacts_count?: number;
  ticketsCount: Record<TicketStatus, number>;
  created_at: Date;
  updated_at: Date;
  workspace_id: string;
}

export interface Contact {
  groups: Group[] | undefined;
  ticketsCount: Record<TicketStatus, number>;
  id: string;
  contact_id?: string;
  workspace_id: string;
  email: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
  };
  age?: number;
  avatar?: string;
  birthday?: Date;
  description?: string;
  first_name?: string;
  last_name?: string;
  name: string;
  gender?: string;
  phone?: string;
  title?: string;
  username?: string;
  website?: string;
  custom_traits?: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
}

export interface Ticket {
  id: string;
  workspace_id: string;
  title: string;
  subject: string;
  contact_id: string;
  assigned_to: string | null;
  created_at: Date;
  updated_at: Date;
  priority: PriorityLevels;
  status: TicketStatus;
  source: string;
  mail_id?: string;
  snooze_until?: Date;
  last_message: {
    content: string;
    type: MessageType;
    created_at: Date;
    author: {
      id: string;
      email: string;
      display_name: string | null;
      profile_url: string | null;
    } | null;
  };
  has_read: boolean;
  labels: Array<{
    id: string;
    name: string;
    icon: string;
    color: string;
    created_at: Date;
    updated_at: Date;
    workspace_id: string;
  }>;
  contact: Contact;
  assigned_user: {
    id: string;
    email: string;
    display_name: string | null;
    profile_url: string | null;
    created_at: Date;
    is_verified: boolean;
    updated_at: Date;
  } | null;
  teamcamp_tasks: string[];
}
