import { formatTicket } from '@/services/serverSide/ticket';

export type TicketDetailsInterface = NonNullable<
  Awaited<ReturnType<typeof formatTicket>>
>;
