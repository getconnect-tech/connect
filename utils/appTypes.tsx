import { User } from '@prisma/client';
import { Contact as PrismaContact } from '@prisma/client';
import { z } from 'zod';
import { LabelData } from './dataTypes';
import { formatTicket } from '@/services/serverSide/ticket';
import { addressSchema, customTraitsSchema } from '@/lib/zod/contact';

export interface UpdateRole {
  userId: string;
  role: string;
}
export type HandleClickProps = {
  value?: string | null;
  userId?: string;
  status?: string;
  labelData?: LabelData;
  labelId?: string;
  isChecked?: boolean;
  item?: any;
};

export type TicketDetailsInterface = NonNullable<
  Awaited<ReturnType<typeof formatTicket>>
> & {
  last_message?: LastMessage; // Make the last_message field optional
  has_read: boolean;
};

interface LastMessage {
  author: User;
  content: string;
  created_at: string;
  type: string;
}

export type Message = { id: string; type: string; content: string };

export type MessageAttachment = {
  fileName: string;
  contentType?: string;
  size: number;
  downloadUrl: string;
};

export type Reaction = {
  reaction: string;
  author: {
    id: string;
    display_name: string | null;
  };
};

export type ReactionProps = {
  emoji: string;
  count: number;
  author: {
    id: string;
    display_name: string | null;
  }[];
};

export interface Contact extends Partial<PrismaContact> {
  address?: z.infer<typeof addressSchema>;
  custom_traits?: z.infer<typeof customTraitsSchema>;
}
