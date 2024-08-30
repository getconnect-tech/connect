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
};

export type TicketDetailsInterface = NonNullable<
  Awaited<ReturnType<typeof formatTicket>>
>;

export type Message = { id: string; type: string; content: string };
