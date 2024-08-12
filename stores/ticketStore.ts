import { action, makeObservable, observable } from 'mobx';
import { TicketDetailsInterface } from '@/utils/appTypes';

class TicketStore {
  loading = false;
  ticketList: TicketDetailsInterface[] = [];
  ticketDetails: TicketDetailsInterface | null = null;

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
  setTicketList(value: TicketDetailsInterface[]) {
    this.ticketList = value;
  }

  // Ticket Details actions
  setTicketDetails(value: TicketDetailsInterface) {
    this.ticketDetails = value;
  }
}

export const ticketStore = new TicketStore();
