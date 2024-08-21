import { formatTicket } from '@/services/serverSide/ticket';

export interface UpdateRole {
  userId: string;
  role: string;
}

export type TicketDetailsInterface = NonNullable<
  Awaited<ReturnType<typeof formatTicket>>
>;
