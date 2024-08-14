import { Contact } from '@prisma/client';
import { formatTicket } from '@/services/serverSide/ticket';

export interface TicketDetailsInterface extends Ticket {
  contact?: Contact;
}

export type Ticket = NonNullable<Awaited<ReturnType<typeof formatTicket>>>;
