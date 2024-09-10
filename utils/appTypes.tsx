import { User } from '@prisma/client';
import { LabelData } from './dataTypes';
import { formatTicket } from '@/services/serverSide/ticket';

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
};

interface LastMessage {
  author: User;
  content: string;
  created_at: string;
  type: string;
}

export type Message = { id: string; type: string; content: string };
