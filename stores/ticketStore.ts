import { action, makeObservable, observable } from 'mobx';
import { TicketDetailsInterface } from '@/utils/appTypes';
import { MessageDetails } from '@/utils/dataTypes';

class TicketStore {
  loading = false;
  ticketList: TicketDetailsInterface[] = [];
  ticketDetails: TicketDetailsInterface | null = null;
  messages: MessageDetails[] = [];

  constructor() {
    makeObservable(this, {
      // Loading variable
      loading: observable,
      setLoading: action,

      // Ticket List
      ticketList: observable,
      setTicketList: action,
      updateTicketListItem: action,

      // Ticket Details
      ticketDetails: observable,
      setTicketDetails: action,

      // Reset Ticket Data
      resetTicketData: action,

      // Ticket Messages
      messages: observable,
      setTicketMessages: action,
      addTicketMessage: action,
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

  // Reset Ticket list
  resetTicketData() {
    this.loading = false;
    this.ticketList = [];
    this.ticketDetails = null;
  }

  updateTicketListItem(index: number, value: TicketDetailsInterface) {
    this.ticketList[index] = value;
  }

  // Ticket Details actions
  setTicketDetails(value: TicketDetailsInterface | null) {
    this.ticketDetails = value;
  }

  // Ticket messages actions
  setTicketMessages(value: MessageDetails[]) {
    this.messages = value;
  }

  addTicketMessage(value: MessageDetails) {
    this.messages = [...(this.messages || []), value];
  }
}

export const ticketStore = new TicketStore();
