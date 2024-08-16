import { formatTicket } from '@/services/serverSide/ticket';

export interface MakeAdmin {
  userId: string;
  role: string;
}

export type TicketDetailsInterface = NonNullable<
  Awaited<ReturnType<typeof formatTicket>>
>;
