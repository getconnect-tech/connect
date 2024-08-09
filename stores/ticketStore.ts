import { Ticket } from '@prisma/client';
import { action, makeObservable, observable } from 'mobx';

class TicketStore {
  loading = false;
  ticketList: Ticket[] = [];

  constructor() {
    makeObservable(this, {
      //Loading variable
      loading: observable,
      setLoading: action,

      //Ticket List
      ticketList: observable,
      setTicketList: action,
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
}

export const ticketStore = new TicketStore();
