import { Contact, Ticket } from '@prisma/client';

export interface TicketDetailsInterface extends Ticket {
  id(id: any, item: any): unknown;
  contact: Contact;
}
