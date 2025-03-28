import { Contact as PrismaContact } from '@prisma/client';
import { z } from 'zod';
import {
  getTicketById,
  getWorkspaceTickets,
} from '@/services/serverSide/ticket';
import { addressSchema, customTraitsSchema } from '@/lib/zod';
import { LabelData } from './dataTypes';

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

export type TicketListInterface = NonNullable<
  Awaited<ReturnType<typeof getWorkspaceTickets>>
>[0];

export type TicketDetailsInterface = NonNullable<
  Awaited<ReturnType<typeof getTicketById>>
>;

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

export interface Contact extends Omit<Partial<PrismaContact>, 'birthday'> {
  address?: z.infer<typeof addressSchema>;
  custom_traits?: z.infer<typeof customTraitsSchema>;
  birthday?: string;
}

export interface ChartData {
  date: string;
  queueSize: number;
  firstResponseTime: number;
  medianResolutionTime: number;
}
