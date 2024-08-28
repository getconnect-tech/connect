import { formatTicket } from '@/services/serverSide/ticket';

export interface UpdateRole {
  userId: string;
  role: string;
}

export type TicketDetailsInterface = NonNullable<
  Awaited<ReturnType<typeof formatTicket>>
>;

export type Message = { id: string; type: string; content: string };
