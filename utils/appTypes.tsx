import { Contact, Ticket } from '@prisma/client';

export interface TicketDetailsInterface extends Ticket {
  contact: Contact;
}
