import { Ticket } from '@prisma/client';
import { action, makeObservable, observable } from 'mobx';

class TicketStore {
  loading = false;
  ticketList: Ticket[] = [];
  ticketDetails: Ticket | null = null;

  constructor() {
    makeObservable(this, {
      // Loading variable
      loading: observable,
      setLoading: action,

      // Ticket List
      ticketList: observable,
      setTicketList: action,

      // Ticket Details
      ticketDetails: observable,
      setTicketDetails: action,
    });
  }

  // Loading actions
  setLoading(value: boolean) {
    this.loading = value;
  }

  // Ticket list actions
  setTicketList(value: Ticket[]) {
    this.ticketList = value;
  }

  // Ticket Details actions
  setTicketDetails(value: Ticket) {
    this.ticketDetails = value;
  }
}

export const ticketStore = new TicketStore();
